/**
 * @author Ollie Beenham
 */

import { getProjectsByType } from "@/lib/db/remote/queries";
import { Metadata } from "next";
import ProjectsPane from "./projectsPane";

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
export default async function CodeProjects() {
	const result = await getProjectsByType("code");
	const projects = result?.projects || [];

	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Code Projects</h1>
			<p className="mb-5">Welcome to the code projects page!</p>
			<ProjectsPane projects={projects} />
		</main>
	);
}
