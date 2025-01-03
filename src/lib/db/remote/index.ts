/**
 * @author Ollie Beenham
 */

import { getInstanceID, getMongoURI } from "../local/queries";

import { MongoClient } from "mongodb";

/**
 * Connect to the MongoDB instance
 *
 * @returns {Promise<{client: MongoClient, instanceID: string}>} The MongoDB client and instance ID
 */
export const createDBConnection = async () => {
	// Get the MongoDB URI from the local database
	const { uri } = await getMongoURI();

	// Get the instance ID
	const { instanceID } = await getInstanceID();

	// Create and return a new MongoDB client
	const client = new MongoClient(uri);
	return { client, instanceID };
};

/**
 * Test a connection string
 *
 * @param {string} connectionString The connection string to test
 * @returns {Promise<boolean>} Whether the connection string is valid
 */
export const testConnectionString = async (connectionString: string) => {
	try {
		const client = new MongoClient(connectionString);
		await client.connect();
		await client.close();
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
