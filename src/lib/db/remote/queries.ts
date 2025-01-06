/**
 * @author Ollie Beenham
 */

import { ObjectId } from "mongodb";
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
		return null;
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
	// Get the client and db
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const projects = await collection
			.find({ type })
			.sort([["updatedAt", "descending"]])
			.toArray();

		const output = JSON.parse(JSON.stringify(projects));

		return output;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		// Close the client connection
		await client.close();
	}
};

/**
 * Get a project by its ID
 *
 * @param {string} _id The ID of the project to fetch
 * @returns {Promise<{ project: any }>} The project with the specified ID
 */
export const getProjectByID = async (_id: ObjectId) => {
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const project = await collection.findOne({ _id });
		return project;
	} catch (error) {
		console.error(error);
		return null;
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
		return null;
	} finally {
		await client.close();
	}
};

/**
 * Delete a project by its ID
 *
 * @param {ObjectId} _id The id of the project to delete
 * @returns {Promise<boolean>} Whether the project was deleted
 */
export const deleteProjectById = async (_id: ObjectId) => {
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const result = await collection.deleteOne({ _id });
		return result.deletedCount === 1;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		await client.close();
	}
};

/**
 * Update a project in the database
 *
 * @param {string} _id The id of the project to update
 * @param {Object} project The project data to update
 * @returns {Promise<boolean>} Whether the project was updated
 */
export const updateProject = async (_id: ObjectId, project: object) => {
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const result = await collection.updateOne(
			{ _id },
			{ $set: project, $currentDate: { updatedAt: true } }
		);
		return result.modifiedCount === 1;
	} catch (error) {
		console.error(error);
		return false;
	} finally {
		await client.close();
	}
};

/**
 * Get all settings from the database
 *
 * @returns {Promise<any[]>} All settings
 */
export const getSettings = async () => {
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("settings");

		const settings = await collection.find().toArray();
		return settings;
	} catch (error) {
		console.error(error);
		return null;
	} finally {
		await client.close();
	}
};

/**
 * Get a setting from the database
 *
 * @param {string} key The key of the setting to fetch
 * @returns {Promise<string | null>} The setting with the specified key, or null if not found
 */
export const getSetting = async (key: string): Promise<{ key: string; value: any }> => {
	const { client, instanceID } = await createDBConnection();

	try {
		// Get the settings collection
		const db = client.db(instanceID);
		const collection = db.collection("settings");

		// Query the collection using the key
		const setting = await collection.findOne({ key });

		// Return the value if found, or null if not
		return setting ? { key, value: setting.value } : { key, value: null };
	} catch (error) {
		console.error("Error fetching setting:", error);
		return { key, value: null };
	} finally {
		await client.close();
	}
};

/**
 * Update a setting in the database
 *
 * @param {string} key The key of the setting to update
 * @param {any} value The new value of the setting
 * @returns {Promise<boolean>} Whether the setting was updated
 */
export const updateSetting = async (key: string, value: any) => {
	const { client, instanceID } = await createDBConnection();

	try {
		// Get the settings collection
		const db = client.db(instanceID);
		const collection = db.collection("settings");

		// Query the collection using the key
		const setting = await collection.updateOne({ key }, { $set: { value } });

		// Return true if updated, or false if not
		return setting.modifiedCount === 1;
	} catch (error) {
		console.error("Error updating setting:", error);
		return false;
	} finally {
		await client.close();
	}
};
