/**
 * Authentication configuration, using secrets from the environment to allow for
 * authentication via Microsoft EntraID.
 */

import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		EntraID({
			clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
			clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
			issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
		}),
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth;
		},
	},
});
