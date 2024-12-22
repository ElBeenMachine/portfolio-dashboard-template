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

		const projects = await collection
			.find()
			.sort([["updatedAt", "descending"]])
			.toArray();
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

		const projects = await collection
			.find({ type })
			.sort([["updatedAt", "descending"]])
			.toArray();
		return { projects };
	} catch (error) {
		console.error(error);
	} finally {
		// Close the client connection
		await client.close();
	}
};

/**
 * Create a blank project in the remote database
 *
 * @param {"code" | "literatire" | "blog"} type The type of project to create
 * @param {string} title The title of the project
 * @returns {Promise<{ project: any }>} The created project
 */
export const createBlankProject = async (type: "code" | "literatire" | "blog", title?: string) => {
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const project = await collection.insertOne({
			name: title || "New Project",
			thumbnail: "/img/default-project-image.jpg",
			createdAt: new Date(),
			updatedAt: new Date(),
			status: "draft",
			type: type,
		});

		return { project };
	} catch (error) {
		console.error(error);
	} finally {
		await client.close();
	}
};
