import { MongoClient, ServerApiVersion } from "mongodb";
import { getInstanceIDSync } from "../db/local/queries";
import { env } from "next-runtime-env";

if (!env("MONGO_URI")) {
	throw new Error('Invalid/Missing environment variable: "MONGO_URI"');
}

const uri = env("MONGO_URI");
const instanceId = getInstanceIDSync();

const options = {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
	// In development mode, use a global variable so that the value
	// is preserved across module reloads caused by HMR (Hot Module Replacement).
	let globalWithMongo = global as typeof globalThis & {
		_mongoClient?: MongoClient;
	};

	const instanceId = getInstanceIDSync();

	if (!globalWithMongo._mongoClient) {
		globalWithMongo._mongoClient = new MongoClient(`${uri}/${instanceId}`, options);
	}
	client = globalWithMongo._mongoClient;
} else {
	// In production mode, it's best to not use a global variable.
	client = new MongoClient(`${uri}/${instanceId}`, options);
}

// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client;
