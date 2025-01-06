/**
 * @author Ollie Beenham
 *
 * Database configuration for local dashboard config database
 */

import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { v4 } from "uuid";

// Define the path to the local database
export let dbPath = "/app/data/db/config.db";

// Determine the path based on the environment
if (process.env.NODE_ENV !== "production") {
	// Create the database directory
	fs.mkdirSync(path.join(process.cwd(), "data/db"), { recursive: true });

	// Set the database path to the development path
	dbPath = path.join(process.cwd(), "data/db/config.db");
} else {
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

/**
 * Check if the config table exists
 *
 * @returns {boolean} - Whether the config table exists
 */
export const checkConfigTable = (): boolean => {
	const query = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='config'");
	const result = query.get();

	if (!result) return false;
	return true;
};

/**
 * Check if the users table exists
 *
 * @returns {boolean} - Whether the users table exists
 */
export const checkUsersTable = (): boolean => {
	const query = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
	const result = query.get();

	if (!result) return false;
	return true;
};

/**
 * Initialize the database
 */
export const initDB = () => {
	// Load in the sql init directory
	const initDir = path.join(process.cwd(), "src/lib/db/local/init/");

	// Loop through the directory and run each SQL file
	const initSQL = fs.readdirSync(initDir).map((file) => {
		const sql = fs.readFileSync(path.join(initDir, file)).toString();
		return [file, sql];
	});

	// Run each SQL file
	initSQL.forEach((file, index) => {
		try {
			console.log(
				`Step ${index + 1} - Configuring ${file[0]
					.substring(2, file[0].length - 4)
					.trim()
					.toLowerCase()}`
			);
			db.prepare(file[1]).run();
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}
	});

	// New Line
	console.log("");

	// See if there is an instance id in the configuration table
	let instanceID;
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		instanceID = (query.get() as { value: string }).value;
	} catch {
		console.error("No instance ID detected, generating one now...\n");
	}

	// If there isn't, create one
	if (!instanceID) {
		// Generate a new instance ID
		instanceID = v4();

		// Insert the instance ID into the database
		db.prepare("INSERT INTO config (key, value) VALUES ('instance-id', ?)").run(instanceID);
	}

	// Log the instance ID
	console.log(`Instance ID: ${instanceID}`);
};
