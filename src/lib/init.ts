/**
 * @author Ollie Beenham
 *
 * A script to run on startup to initialize/update the database
 */

// Initialise the database
import { dbPath, initDB } from "./db/local";

// Run the database initialization
console.log("\n----------------------------------------- Initialising Database -----------------------------------------\n");
console.log(`Database loaded at: ${dbPath}\n`);
console.log("Initializing database\n");
initDB();
console.log("\nDatabase initialized");
console.log("\n---------------------------------------------------------------------------------------------------------\n");
