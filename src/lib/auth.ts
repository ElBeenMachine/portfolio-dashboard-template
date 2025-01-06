/**
 * @author Ollie Beenham
 *
 * Authentication configuration, using secrets from the environment to allow for
 * authentication via Microsoft EntraID.
 */

import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { env } from "next-runtime-env";
import { getUserByUsername } from "./db/local/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		EntraID({
			clientId: env("AUTH_MICROSOFT_ENTRA_ID_ID"),
			clientSecret: env("AUTH_MICROSOFT_ENTRA_ID_SECRET"),
			issuer: env("AUTH_MICROSOFT_ENTRA_ID_ISSUER"),
		}),
		Credentials({
			name: "local",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: Partial<Record<"username" | "password", unknown>>) {
				const username = credentials.username as string;
				const password = credentials.password as string;

				const user = await getUserByUsername(username);

				if (!user) throw new Error("User not found");

				const isValidPassword = await compare(password, user.password);

				if (!isValidPassword) throw new Error("Invalid password");

				return {
					id: user.id,
					username: user.username,
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
	},
	session: {
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 1 * 60 * 60, // 1 Hour
	},
	trustHost: true,
});
