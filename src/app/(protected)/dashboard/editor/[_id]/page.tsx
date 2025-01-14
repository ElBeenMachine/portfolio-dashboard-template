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
			<h1 className="text-3xl text-semibold mb-5">Editor</h1>
			<div className="bg-white rounded-lg p-5 relative">
				<ProjectForm project={plainProject} />
			</div>
		</div>
	);
}
