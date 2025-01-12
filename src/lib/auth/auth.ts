/**
 * @author Ollie Beenham
 *
 * Authentication configuration, using secrets from the environment to allow for
 * authentication via Microsoft EntraID.
 */

import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";
import { env } from "next-runtime-env";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getInstanceIDSync } from "../db/local/queries";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		EntraID({
			clientId: env("AUTH_MICROSOFT_ENTRA_ID_ID"),
			clientSecret: env("AUTH_MICROSOFT_ENTRA_ID_SECRET"),
			issuer: env("AUTH_MICROSOFT_ENTRA_ID_ISSUER"),
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
		strategy: "jwt",
	},
	trustHost: true,
});
