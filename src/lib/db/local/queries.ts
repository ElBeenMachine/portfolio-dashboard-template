/**
 * @author Ollie Beenham
 */

import { env } from "next-runtime-env";
import { db } from ".";

/**
 * Get the instance ID
 *
 * @returns {Promise<{instanceID: string}>} The instance ID
 */
export const getInstanceID = async () => {
	// If the environment variable is set, return that value
	if (env("INSTANCE_ID")) return env("INSTANCE_ID");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		const result = (query.get() as { value: string }).value;
		return result;
	} catch {
		throw new Error("Instance ID not found");
	}
};

/**
 * Get the instance ID synchronously
 *
 * @returns {string} The instance ID
 */
export const getInstanceIDSync = () => {
	// If the environment variable is set, return that value
	if (env("INSTANCE_ID")) return env("INSTANCE_ID");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		const result = (query.get() as { value: string }).value;
		return result;
	} catch {
		throw new Error("Instance ID not found");
	}
};
