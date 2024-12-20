/**
 * @author Ollie Beenham
 */

import { createDBConnection } from ".";

/**
 * Get all projects from the database
 *
 * @returns {Promise<{ projects: any[] }>} All projects
 */
export const getAllProjects = async () => {
	// Get the client and instance ID
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const projects = await collection.find().toArray();
		return { projects };
	} catch (error) {
		console.error(error);
	} finally {
		// Close the client connection
		await client.close();
	}
};

/**
 * Get all projects of a specific type from the database
 *
 * @param {string} type The type of project to fetch
 * @returns {Promise<{ projects: any[] }>} All projects of the specified type
 */
export const getProjectsByType = async (type: string) => {
	// Get the client and instance ID
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const projects = await collection.find({ type }).toArray();
		return { projects };
	} catch (error) {
		console.error(error);
	} finally {
		// Close the client connection
		await client.close();
	}
};
