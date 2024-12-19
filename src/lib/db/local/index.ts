/**
 * @author Ollie Beenham
 *
 * Database configuration for local dashboard config database
 */

import path from "path";
import fs from "fs";
import Database from "better-sqlite3";

// Define the path to the local database
export let dbPath = "/data/db/config.db";

// Determine the path based on the environment
if (process.env.NODE_ENV !== "production") {
	// Create the database directory
	fs.mkdirSync(path.join(process.cwd(), "data/db"), { recursive: true });

	// Set the database path to the development path
	dbPath = path.join(process.cwd(), "data/db/config.db");
}

/**
 * Create a new SQLite database connection
 */
export const db = new Database(dbPath, {
	fileMustExist: false,
	readonly: false,
});

/**
 * Initialize the database
 */
export const initDB = () => {
	// Load the init SQL statement from ./sql/init.sql
	const initSQL = fs
		.readFileSync(path.join(__dirname, "./sql/init.sql"))
		.toString();

	// Run the init SQL statement
	try {
		const readQuery = db.exec(initSQL);
		return readQuery;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
