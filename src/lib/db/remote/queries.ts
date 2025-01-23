/**
 * @author Ollie Beenham
 */

import { ObjectId } from "mongodb";
import { connectToDatabase } from ".";
import Audit from "@/types/audit.interface";

/**
 * Get all projects from the database
 *
 * @returns {Promise<{ projects: any[] }>} All projects
 */
export const getAllProjects = async () => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("projects");

		const projects = await collection
			.find()
			.sort([["updatedAt", "descending"]])
			.toArray();
		return { projects };
	} catch (error) {
		console.error(error);
		return null;
	}
};

/**
 * Get all projects of a specific type from the database
 *
 * @param {string} type The type of project to fetch
 * @returns {Promise<{ projects: any[] }>} All projects of the specified type
 */
export const getProjectsByType = async (type: string) => {
	try {
		const db = await connectToDatabase();
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
	}
};

/**
 * Get a project by its ID
 *
 * @param {string} _id The ID of the project to fetch
 * @returns {Promise<{ project: any }>} The project with the specified ID
 */
export const getProjectByID = async (_id: ObjectId) => {
	try {
		const db = await connectToDatabase();
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
	try {
		const db = await connectToDatabase();
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
	}
};

/**
 * Archive a project by its ID
 *
 * @param {ObjectId} _id The id of the project to archive
 * @returns {Promise<boolean>} Whether the project was archived
 */
export const archiveProjectById = async (_id: ObjectId) => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("projects");

		// Move the project to the archived_projects collection
		const project = await collection.findOne({ _id: new ObjectId(_id) });
		if (!project) return null;

		// Insert the project into the archived_projects collection
		const archivedCollection = db.collection("archived_projects");
		const result = await archivedCollection.insertOne(project);
		if (!result.acknowledged) return null;

		// Archive the project from the projects collection
		await collection.deleteOne({ _id: new ObjectId(_id) });
		return project;
	} catch (error) {
		console.error(error);
		return false;
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
	try {
		const db = await connectToDatabase();
		const collection = db.collection("projects");

		const result = await collection.updateOne(
			{ _id },
			{ $set: project, $currentDate: { updatedAt: true } }
		);
		return result.modifiedCount === 1;
	} catch (error) {
		console.error(error);
		return false;
	}
};

/**
 * Get all settings from the database
 *
 * @returns {Promise<any[]>} All settings
 */
export const getSettings = async () => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("settings");

		const settings = await collection.find().toArray();
		return settings;
	} catch (error) {
		console.error(error);
		return null;
	}
};

/**
 * Get a setting from the database
 *
 * @param {string} key The key of the setting to fetch
 * @returns {Promise<string | null>} The setting with the specified key, or null if not found
 */
export const getSetting = async (
	key: string
): Promise<{ key: string | null; value: string | boolean | number | null }> => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("settings");

		// Query the collection using the key
		const setting = await collection.findOne({ key });

		// Return the value if found, or null if not
		return setting ? { key, value: setting.value } : { key, value: null };
	} catch (error) {
		console.error("Error fetching setting:", error);
		return { key, value: null };
	}
};

/**
 * Update a setting in the database
 *
 * @param {string} key The key of the setting to update
 * @param {any} value The new value of the setting
 * @returns {Promise<boolean>} Whether the setting was updated
 */
export const updateSetting = async (key: string, value: string | boolean | number) => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("settings");

		// Query the collection using the key
		const setting = await collection.updateOne({ key }, { $set: { value } });

		// Return true if updated, or false if not
		return setting.modifiedCount === 1;
	} catch (error) {
		console.error("Error updating setting:", error);
		return false;
	}
};

/**
 * Fetch the recent projects from the database
 *
 * @param {number} count The number of recent projects to fetch
 * @returns {Promise<any[]>} The recent projects
 */
export const getRecentProjects = async (count: number) => {
	try {
		const db = await connectToDatabase();
		const collection = db.collection("projects");

		const projects = await collection.find().sort({ updatedAt: -1 }).limit(count).toArray();

		return projects;
	} catch (error) {
		console.error(error);
		return null;
	}
};

/**
 * Add an audit trail to the database
 *
 * @param audit Audit trail object
 * @returns Result of the insert operation
 */
export const addAuditTrail = async (audit: Audit) => {
	// Create a timestamp
	const timestamp = new Date();

	// Get the database
	const db = await connectToDatabase();

	// Get the audit collection
	const collection = db.collection("audit");

	// Insert the audit trail
	const result = await collection.insertOne({
		...audit,
		timestamp,
	});

	return result;
};

/**
 * Get the audit trail from the database
 *
 * @param {number} count The number of audit trail entries to fetch
 * @returns {Promise<any[]>} The audit trail
 */
export const getAuditTrail = async (count: number): Promise<Audit[] | null> => {
	// Get the database
	const db = await connectToDatabase();

	// Get the audit collection
	const collection = db.collection("audit");

	// Get the audit trail
	const audit = (await collection
		.find()
		.sort({ timestamp: -1 })
		.limit(count)
		.toArray()) as Audit[];

	return audit;
};

export const globalSearch = async (query: string) => {
	// Get the database
	const db = await connectToDatabase();

	// Search the projects collection
	const projects = await db
		.collection("projects")
		.find({
			$text: {
				$search: query,
			},
		})
		.toArray();

	return projects;
};
