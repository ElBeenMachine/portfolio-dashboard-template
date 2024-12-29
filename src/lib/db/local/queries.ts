/**
 * @author Ollie Beenham
 */

import { db } from ".";

/**
 * Get the instance ID
 *
 * @returns {Promise<{instanceID: string}>} The instance ID
 */
export const getInstanceID = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'instance-id'");
		const result = (query.get() as { value: string }).value;
		return { instanceID: result };
	} catch {
		return { instanceID: "" };
	}
};

/**
 * Get all content types
 *
 * @returns {Promise<{contentTypes: string[]}>} All content types
 */
export const getAllContentTypes = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'content-types'");
		const result = (query.get() as { value: string }).value;
		return { contentTypes: JSON.parse(result) };
	} catch {
		return { contentTypes: [] };
	}
};

/**
 * Get the dashboard logo
 *
 * @returns {Promise<{logo: string}>} The logo
 */
export const getLogo = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'logo'");
		const result = (query.get() as { value: string }).value;
		return { logo: result };
	} catch {
		return { logo: "" };
	}
};

/**
 * Update the dashboard logo
 *
 * @param {string} url The new logo url
 */
export const updateLogo = async (url: string) => {
	try {
		const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('logo', ?)");
		const result = query.run(url);
		return result.changes > 0;
	} catch {
		return false;
	}
};

/**
 * Get the title of the dashboard
 *
 * @returns {Promise<{title: string}>} The title
 */
export const getTitle = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'title'");
		const result = (query.get() as { value: string }).value;
		return { title: result };
	} catch {
		return { title: "" };
	}
};

/**
 * Get all of the stored settings in the config table
 */
export const getAllSettings = async () => {
	try {
		const query = db.prepare("SELECT key, value FROM config");
		const result = query.all();
		return result;
	} catch {
		return null;
	}
};

/**
 * Get the current remote database address
 *
 * @returns {Promise<{uri: string}>} The URI of the mongodb database
 */
export const getMongoURI = async () => {
	try {
		const query = db.prepare(
			"SELECT value FROM config WHERE key = 'mongodb-connection-string'"
		);
		const result = (query.get() as { value: string }).value;
		return { uri: result };
	} catch {
		return { uri: "" };
	}
};

/**
 * Update the current remote database address
 *
 * @param {string} uri The URI of the mongodb database
 */
export const updateMongoURI = async (uri: string) => {
	try {
		const query = db.prepare(
			"INSERT OR REPLACE INTO config (key, value) VALUES ('mongodb-connection-string', ?)"
		);
		const result = query.run(uri);
		return result.changes > 0;
	} catch {
		return false;
	}
};

/**
 *
 *
 * @param title The new title of the dashboard
 */
export const updateTitle = async (title: string) => {
	try {
		const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('title', ?)");
		const result = query.run(title);
		return result.changes > 0;
	} catch {
		return false;
	}
};

/**
 * Get the background image of the authentication page
 *
 * @returns {Promise<{url: string}>} The background image of the authentication page
 */
export const getAuthBackground = async () => {
	try {
		const query = db.prepare("SELECT value FROM config WHERE key = 'auth-background'");
		const result = (query.get() as { value: string }).value;
		return { url: result };
	} catch {
		return { url: "" };
	}
};

/**
 * Set the background image of the authentication page
 *
 * @param {string} url The new background image of the authentication page
 */
export const updateAuthBackground = async (url: string) => {
	try {
		const query = db.prepare(
			"INSERT OR REPLACE INTO config (key, value) VALUES ('auth-background', ?)"
		);
		const result = query.run(url);
		return result.changes > 0;
	} catch {
		return false;
	}
};
