/**
 * @author Ollie Beenham
 */

/**
 * Function to capitalise the first letter of a string
 *
 * @param str The string to capitalise
 * @returns A string with the first letter capitalised
 */
export function capitalise(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
