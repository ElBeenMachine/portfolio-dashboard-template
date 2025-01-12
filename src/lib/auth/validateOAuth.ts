import { env } from "next-runtime-env";

/**
 * Check if all required environment variables for Microsoft OAuth are set
 *
 * @returns {Promise<boolean>} The result of the check
 */
export const checkMicrosoftEntraId = async () => {
	// Required environment variables
	const requiredEnvVars = [
		"AUTH_MICROSOFT_ENTRA_ID_ID",
		"AUTH_MICROSOFT_ENTRA_ID_SECRET",
		"AUTH_MICROSOFT_ENTRA_ID_ISSUER",
	];

	// Check if all required environment variables are set
	const unsetEnvVars = requiredEnvVars.filter((envVar) => !env(envVar));

	// If all required environment variables are set, return true
	return unsetEnvVars.length === 0;
};

/**
 * Check if all required environment variables for Google OAuth are set
 *
 * @returns {Promise<boolean>} The result of the check
 */
export const checkGoogle = async () => {
	// Required environment variables
	const requiredEnvVars = ["AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET"];

	// Check if all required environment variables are set
	const unsetEnvVars = requiredEnvVars.filter((envVar) => !env(envVar));

	// If all required environment variables are set, return true
	return unsetEnvVars.length === 0;
};

/**
 * Check if all required environment variables for GitHub OAuth are set
 *
 * @returns {Promise<boolean>} The result of the check
 */
export const checkGitHub = async () => {
	// Required environment variables
	const requiredEnvVars = ["AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET"];

	// Check if all required environment variables are set
	const unsetEnvVars = requiredEnvVars.filter((envVar) => !env(envVar));

	// If all required environment variables are set, return true
	return unsetEnvVars.length === 0;
};
