/**
 * @author Ollie Beenham
 */

import { Metadata } from "next";

/**
 * Export the metadata for the page
 */
export const metadata: Metadata = {
	title: "Code Projects",
};

/**
 * Code projects page
 *
 * @returns {JSX.Element} Code projects page
 */
export default function CodeProjects() {
	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Code Projects</h1>
			<p>Welcome to the code projects page!</p>
		</main>
	);
}
