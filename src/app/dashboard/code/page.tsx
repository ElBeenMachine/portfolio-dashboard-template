/**
 * @author Ollie Beenham
 */

import { getProjectsByType } from "@/lib/db/remote/queries";
import { Metadata } from "next";
import ProjectsPane from "./projectsPane";
import CreateButton from "./CreateButton";
import DatabaseErrorMessage from "@/components/errors/DatabaseError";

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
	let projects;
	try {
		projects = await getProjectsByType("code");
	} catch {
		return <DatabaseErrorMessage />;
	}

	return (
		<main>
			<CreateButton />
			<h1 className="text-3xl text-semibold mb-5">Code Projects</h1>
			<p className="mb-5">Welcome to the code projects page!</p>
			{projects && <ProjectsPane projects={projects} />}
		</main>
	);
}
