/**
 * @author Ollie Beenham
 */

import { getProjectByID } from "@/lib/db/remote/queries";
import { ObjectId } from "mongodb";
import ProjectForm from "./Editor";
import { Metadata } from "next";

/**
 * Metadata for the editor window.
 */
export const metadata: Metadata = {
	title: "Editor",
};

/**
 * Editor window component
 *
 * @param {Object} params The URL route params
 * @returns {JSX.Element} The editor window
 */
export default async function EditorWindow({ params }: { params: Promise<{ _id: string }> }) {
	// Get the ID from the slug
	const { _id } = await params;
	const project = await getProjectByID(new ObjectId(_id));
	const plainProject = JSON.parse(JSON.stringify(project));

	return (
		<div>
			<ProjectForm project={plainProject} />
		</div>
	);
}
