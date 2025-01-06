/**
 * @author Ollie Beenham
 *
 * A script to run on startup to initialize/update the database
 */
import { dbPath, initLocalDatabase } from "./db/local";
import { maskConnectionString, mongoURI } from "./db/remote";
import { initRemoteDatabase } from "./db/remote/init";

(async () => {
	// Run the database initialization
	console.log(
		"\n----------------------------------------- Initialising Database -----------------------------------------\n"
	);

	// Initialise the local database
	console.log(`Initializing local database at ${dbPath}`);
	await initLocalDatabase();

	// Initialise the remote database
	console.log(`\nInitializing remote database at ${maskConnectionString(mongoURI)}`);
	await initRemoteDatabase();

	console.log(
		"\n---------------------------------------------------------------------------------------------------------\n"
	);

	// Exit the process
	process.exit(0);
})();
