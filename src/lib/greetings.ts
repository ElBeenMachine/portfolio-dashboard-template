import { capitalise } from "./StringOperations";

/**
 * Function to get a greeting based on the time of day
 *
 * @param {string} name The name to greet
 * @returns {string} The greeting
 */
export const getGreeting = (name: string): string => {
	// Get morning/afternoon/evening
	const date = new Date();
	const hours = date.getHours();
	let timeOfDay = "";

	if (hours < 12) {
		timeOfDay = "morning";
	} else if (hours < 18) {
		timeOfDay = "afternoon";
	} else {
		timeOfDay = "evening";
	}

	// Return the greeting
	return `Good ${timeOfDay}, ${capitalise(name)}!`;
};
