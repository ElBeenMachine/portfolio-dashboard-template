/**
 * @author Ollie Beenham
 */

import { MongoClient } from "mongodb";
import { instanceID } from "../local";
import { env } from "next-runtime-env";

export const mongoURI = env("MONGO_URI") as string;

/**
 * Connect to the MongoDB instance
 *
 * @returns {Promise<{client: MongoClient, instanceID: string}>} The MongoDB client and instance ID
 */
export const createDBConnection = async (): Promise<{
	client: MongoClient;
	instanceID: string;
}> => {
	// Test the connection
	await testConnectionString(mongoURI);

	// Create and return a new MongoDB client
	const client = new MongoClient(mongoURI);
	return { client, instanceID };
};

/**
 * Mask the MongoDB URI
 *
 * @param {string} uri The URI of the mongodb database
 * @returns {string} The masked URI
 */
export const maskConnectionString = (uri: string): string => {
	return uri.replace(/\/\/(.*?):(.*?)@/, "//user:password@");
};

/**
 * Test a connection string
 *
 * @param {string} connectionString The connection string to test
 */
export const testConnectionString = async (connectionString: string) => {
	// If no connection string is provided, throw an error
	if (!connectionString)
		throw new Error(
			"No connection string provided, please ensure the MONGO_URI environment variable is set."
		);

	// Create the database client
	const client = new MongoClient(connectionString);

	// Attempt to connect to the database
	await client.connect();
	await client.close();
};
