/**
 * @author Ollie Beenham
 */

import { getProjectsByType } from "@/lib/db/remote/queries";
import { Metadata } from "next";
import ProjectsPane from "@/components/projects/projectsPane";
import CreateButton from "@/components/projects/CreateButton";
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
		<div>
			<h1 className="text-3xl text-semibold mb-5">Code Projects</h1>
			<div className="bg-white rounded-lg p-5 relative">
				<CreateButton />
				<p className="mb-10">Welcome to the code projects page!</p>
				{projects && <ProjectsPane projects={projects} />}
			</div>
		</div>
	);
}
