/**
 * @author Ollie Beenham
 */

import { createDBConnection } from ".";

// Initialise the remote database
export const initRemoteDatabase = async () => {
	// Connect to the database
	const { client, instanceID } = await createDBConnection();

	// Create the database if it doesn't exist
	const db = client.db(instanceID);

	// Create database collections
	await Promise.all([
		db.createCollection("settings"),
		db.createCollection("users"),
		db.createCollection("identityProviders"),
		db.createCollection("projects"),
	]);

	// Populate with default values if necessary
	const settings = db.collection("settings");

	// Check to see if the dashboard title is set
	const dashboardTitle = await settings.findOne({ key: "dashboardTitle" });
	if (!dashboardTitle) await settings.insertOne({ key: "dashboardTitle", value: "My Dashboard" });

	// Check to see if the auth background is set
	const authBackground = await settings.findOne({ key: "authBackground" });
	if (!authBackground) {
		await settings.insertOne({
			key: "authBackground",
			value: "https://bingw.jasonzeng.dev?resolution=1920x1080&index=random",
		});
	}

	// Check to see if the dashboard logo is set
	const dashboardLogo = await settings.findOne({ key: "dashboardLogo" });
	if (!dashboardLogo) {
		await settings.insertOne({
			key: "dashboardLogo",
			value: "/img/default-logo.jpg",
		});
	}

	// Check to see if the content types are set
	const contentTypes = await settings.findOne({ key: "contentTypes" });
	if (!contentTypes) {
		await settings.insertOne({
			key: "contentTypes",
			value: [
				{
					type: "code",
					enabled: true,
				},
				{
					type: "literature",
					enabled: true,
				},
				{
					type: "blog",
					enabled: true,
				},
			],
		});
	}

	// Set the dashboard onboarded state
	const onboarded = await settings.findOne({ key: "onboarded" });
	if (!onboarded) await settings.insertOne({ key: "onboarded", value: false });

	// Close the connection
	await client.close();

	// Log the success
	console.log(`Remote database successfully initialized with instance ID: ${instanceID}`);
};
