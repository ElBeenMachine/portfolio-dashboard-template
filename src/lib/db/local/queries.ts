/**
 * @author Ollie Beenham
 */

import { db } from ".";

/**
 * Get the instance ID
 *
 * @returns {Promise<{instanceID: string}>} The instance ID
 */
export const getInstanceID = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		const result = (query.get() as { value: string }).value;
		return result;
	} catch {
		throw new Error("Instance ID not found");
	}
};
