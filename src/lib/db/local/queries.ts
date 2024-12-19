/**
 * @author Ollie Beenham
 */

import { db } from "."

/**
 * Get all content types
 * 
 * @returns {Promise<{contentTypes: string[]}>} All content types
 */
export const getAllContentTypes = async() => {
    const query = db.prepare("SELECT value FROM config WHERE key = 'content_types'");
    const result = (query.get() as { value: string }).value;
    return { contentTypes: JSON.parse(result) };
}

/**
 * Get the dashboard logo
 * 
 * @returns {Promise<{logo: string}>} The logo
 */
export const getLogo = async() => {
    const query = db.prepare("SELECT value FROM config WHERE key = 'logo'");
    const result = (query.get() as { value: string }).value;
    return { logo: result };
}

/**
 * Get the title of the dashboard
 * 
 * @returns {Promise<{title: string}>} The title
 */
export const getTitle = async() => {
    const query = db.prepare("SELECT value FROM config WHERE key = 'title'");
    const result = (query.get() as { value: string }).value;
    return { title: result };
}

/**
 * Get all of the stored settings in the config table
 */
export const getAllSettings = async() => {
    const query = db.prepare("SELECT key, value FROM config");
    const result = query.all();
    return result;
}

/**
 * Update the current remote database address
 * 
 * @param {string} uri The URI of the mongodb database
 */
export const updateMongoURI = async(uri: string) => {
    try {
        const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('mongodb-connection-string', ?)");
        const result = query.run(uri);
        return result.changes > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * 
 * 
 * @param title The new title of the dashboard
 */
export const updateTitle = async(title: string) => {
    try {
        const query = db.prepare("INSERT OR REPLACE INTO config (key, value) VALUES ('title', ?)");
        const result = query.run(title);
        return result.changes > 0;
    } catch (error) {
        console.error(error);
        return false;
    }
}