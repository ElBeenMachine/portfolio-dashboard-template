/**
 * @author Ollie Beenham
 *
 * Authentication configuration, using secrets from the environment to allow for
 * authentication via Microsoft EntraID.
 */

import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";
import Google from "next-auth/providers/google";

import { env } from "next-runtime-env";

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createDBConnection } from "../db/remote";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			name: "credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async (credentials): Promise<any> => {
				// Get the database
				const { client, instanceID } = await createDBConnection();
				if (!client) throw new Error("Remote database is null");

				// Get the database instance
				const db = client.db(instanceID);

				// Get the users collection
				const users = db.collection("users");

				// Get the user
				const user = await users.findOne({
					username: { $regex: new RegExp(credentials.username as string, "i") },
				});

				// If the user does not exist, return null
				if (!user) return null;

				// Compare the password
				const valid = await bcrypt.compare(credentials.password as string, user.password);
				if (!valid) return null;

				// Return the user
				return {
					name: user.firstName + " " + user.lastName,
					email: user.email,
					image: user.image || "/img/default-profile-image.jpg",
					id: user._id,
					username: user.username,
					role: user.role,
				};
			},
		}),
		EntraID({
			clientId: env("AUTH_MICROSOFT_ENTRA_ID_ID"),
			clientSecret: env("AUTH_MICROSOFT_ENTRA_ID_SECRET"),
			issuer: env("AUTH_MICROSOFT_ENTRA_ID_ISSUER"),
		}),
		Google({
			clientId: env("AUTH_GOOGLE_ID"),
			clientSecret: env("AUTH_GOOGLE_SECRET"),
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
				token.image = user.image;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.email = token.email as string;
				session.user.name = token.name as string;
				session.user.image = token.image as string;
			}
			return session;
		},
	},
	session: {
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 1 * 60 * 60, // 1 Hour
		strategy: "jwt",
	},
	trustHost: true,
});

/**
 * One-time use function to create the initial admin user. This function will only be called during onboarding
 *
 * @returns {Promise<void>} A promise that resolves when the admin user has been created
 */
export const createAdminUser = async (user: {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
	role: "admin" | "user";
}) => {
	// Get the database
	const { client, instanceID } = await createDBConnection();
	if (!client) throw new Error("Remote database is null");

	// Get the database instance
	const db = client.db(instanceID);

	// Get the users collection
	const users = db.collection("users");

	// Check if the user already exists
	const existingUser = await users.findOne({ username: user.username });

	// If the user already exists, throw an error
	if (existingUser) throw new Error("User already exists");

	// Hash the password
	const hashedPassword = await bcrypt.hash(user.password, 10);

	// Create the user
	const operation = await users.insertOne({
		username: user.username,
		password: hashedPassword,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		role: user.role,
	});

	// If the operation is successful, return true
	if (operation.acknowledged) return true;

	// Otherwise, return false
	return false;
};
