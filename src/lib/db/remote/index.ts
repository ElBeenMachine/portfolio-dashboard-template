/**
 * @author Ollie Beenham
 */

import { MongoClient } from "mongodb";
import { env } from "next-runtime-env";
import { getInstanceID } from "../local/queries";

export const mongoURI = env("MONGO_URI") as string;

/**
 * Connect to the MongoDB instance
 *
 * @returns {Promise<{client: MongoClient, instanceID: string}>} The MongoDB client and instance ID
 */
export const createDBConnection = async () => {
	if (env("DOCKER_BUILD")) return { client: null, instanceID: null };

	// Get the instance ID
	const instanceID = await getInstanceID();

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
	if (!uri) return "";
	return uri.replace(/\/\/(.*?):(.*?)@/, "//user:password@");
};
