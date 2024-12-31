/**
 * @author Ollie Beenham
 */

import { db, checkConfigTable } from ".";

/**
 * Get the instance ID
 *
 * @returns {Promise<{instanceID: string}>} The instance ID
 */
export const getInstanceID = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		const result = (query.get() as { value: string }).value;
		return { instanceID: result };
	} catch {
		throw new Error("Instance ID not found");
	}
};

/**
 * Get all content types
 *
 * @returns {Promise<{contentTypes: string[]}>} All content types
 */
export const getAllContentTypes = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'content-types'");
		const result = (query.get() as { value: string }).value;
		return { contentTypes: JSON.parse(result) };
	} catch {
		throw new Error("Content types not found");
	}
};

/**
 * Get the dashboard logo
 *
 * @returns {Promise<{logo: string}>} The logo
 */
export const getLogo = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'logo'");
		const result = (query.get() as { value: string }).value;
		return { logo: result };
	} catch {
		throw new Error("Logo not found");
	}
};

/**
 * Update the dashboard logo
 *
 * @param {string} url The new logo url
 */
export const updateLogo = async (url: string) => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('logo', ?)");
		const result = query.run(url);
		return result.changes > 0;
	} catch {
		throw new Error("Failed to update logo");
	}
};

/**
 * Get the title of the dashboard
 *
 * @returns {Promise<{title: string}>} The title
 */
export const getTitle = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'title'");
		const result = (query.get() as { value: string }).value;
		return { title: result };
	} catch {
		throw new Error("Title not found");
	}
};

/**
 * Get all of the stored settings in the config table
 */
export const getAllSettings = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT key, value FROM config");
		const result = query.all();
		return result;
	} catch {
		throw new Error("Failed to get settings");
	}
};

/**
 * Get the current remote database address
 *
 * @returns {Promise<{uri: string}>} The URI of the mongodb database
 */
export const getMongoURI = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare(
			"SELECT value FROM config WHERE key = 'mongodb-connection-string'"
		);
		const result = (query.get() as { value: string }).value;
		return { uri: result };
	} catch {
		throw new Error("MongoDB URI not found");
	}
};

/**
 * Update the current remote database address
 *
 * @param {string} uri The URI of the mongodb database
 */
export const updateMongoURI = async (uri: string) => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare(
			"INSERT OR REPLACE INTO config (key, value) VALUES ('mongodb-connection-string', ?)"
		);
		const result = query.run(uri);
		return result.changes > 0;
	} catch {
		throw new Error("Failed to update MongoDB URI");
	}
};

/**
 *
 *
 * @param title The new title of the dashboard
 */
export const updateTitle = async (title: string) => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('title', ?)");
		const result = query.run(title);
		return result.changes > 0;
	} catch {
		throw new Error("Failed to update title");
	}
};

/**
 * Get the background image of the authentication page
 *
 * @returns {Promise<{url: string}>} The background image of the authentication page
 */
export const getAuthBackground = async () => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'auth-background'");
		const result = (query.get() as { value: string }).value;
		return { url: result };
	} catch {
		throw new Error("Auth background not found");
	}
};

/**
 * Set the background image of the authentication page
 *
 * @param {string} url The new background image of the authentication page
 */
export const updateAuthBackground = async (url: string) => {
	if (!checkConfigTable()) throw new Error("Database does not exist");

	try {
		const query = db.prepare(
			"INSERT OR REPLACE INTO config (key, value) VALUES ('auth-background', ?)"
		);
		const result = query.run(url);
		return result.changes > 0;
	} catch {
		throw new Error("Failed to update auth background");
	}
};
