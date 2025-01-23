/**
 * @author Ollie Beenham
 */

import { Db, MongoClient } from "mongodb";
import { env } from "next-runtime-env";
import { getInstanceIDSync } from "../local/queries";

export const mongoURI = env("MONGO_URI") as string;

// If the database URI was not defined, throw an error
if (!mongoURI) {
	if (env("DOCKER_BUILD") == "false")
		throw new Error("Environment variable MONGO_URI was not defined");
}

const instanceID = getInstanceIDSync();

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db | null> {
	if (env("DOCKER_BUILD")) return null;

	if (cachedDb) return cachedDb;

	if (!cachedClient) {
		// Create a new client
		cachedClient = new MongoClient(mongoURI);

		// Connect to the client
		await cachedClient.connect();
	}

	cachedDb = cachedClient.db(instanceID);
	return cachedDb!;
}

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
