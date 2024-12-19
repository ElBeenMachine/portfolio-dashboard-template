/**
 * @author Ollie Beenham
 *
 * A script to run on startup to initialize/update the database
 */

// Initialise the database
import { initDB } from "./db/local";
const init = initDB();

// Log the result of the database initialization
if (init) {
	console.log("Local database initialized successfully");
}
