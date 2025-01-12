import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { v4 as uuidv4 } from "uuid";

// Define the path to the local database
export let dbPath: string;

if (process.env.NODE_ENV !== "production") {
	// Create the database directory
	fs.mkdirSync(path.join(process.cwd(), "data/db"), { recursive: true });

	// Set the database path to the development path
	dbPath = path.join(process.cwd(), "data/db/config.db");
} else {
	dbPath = "/app/data/db/config.db";

	// Ensure the directory exists in production
	const dir = path.dirname(dbPath);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
}

/**
 * Create a new SQLite database connection
 */
export const db = new Database(dbPath, {
	fileMustExist: false,
	readonly: false,
});

// Export the instance ID
export let instanceID: string;

/**
 * Initialize the database
 */
export const initLocalDatabase = async () => {
	try {
		// Create the config table if it doesn't exist
		db.prepare("CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT)").run();

		// Get instance ID from database
		const instanceIDResult = (await db
			.prepare("SELECT value FROM config WHERE key = 'instance-id'")
			.get()) as { value: string };
		instanceID = instanceIDResult?.value;

		// If no instance ID, generate and save
		if (!instanceID) {
			instanceID = uuidv4();
			db.prepare("INSERT INTO config (key, value) VALUES ('instance-id', ?)").run(instanceID);
		}

		console.log(`Local database successfully initialized with instance ID: ${instanceID}`);
	} catch (error) {
		console.error("Error initializing local database:", error);
	}
};
