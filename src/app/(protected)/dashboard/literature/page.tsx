/**
 * @author Ollie Beenham
 */

import { Metadata } from "next";

/**
 * Export the metadata for the page
 */
export const metadata: Metadata = {
	title: "Literature Pieces",
};

/**
 * Literature projects page
 *
 * @returns {JSX.Element} Literature projects page
 */
export default function LiteratureProjects() {
	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Literature Projects</h1>
			<p>Welcome to the literature projects page!</p>
		</main>
	);
}
