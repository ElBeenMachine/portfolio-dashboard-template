/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { createDBConnection } from "@/lib/db/remote";
import { getRecentProjects } from "@/lib/db/remote/queries";
import { getAuditTrail } from "@/lib/db/remote/queries";
import { getGreeting } from "@/lib/greetings";
import Audit from "@/types/audit.interface";
import Project from "@/types/project.interface";
import moment from "moment";
import Link from "next/link";

/**
 * Create a message for a project audit
 *
 * @param {Audit} audit The audit object
 */
async function createProjectAuditMessage(audit: Audit) {
	// Create a database connection
	const { client, instanceID } = await createDBConnection();
	if (!client) return null;

	// Get the projects
	const db = client.db(instanceID);
	const collection = db.collection("projects");
	const archiveCollection = db.collection("archived_projects");

	// Get the project
	let project: Project;
	project = (await collection.findOne({ _id: audit.project })) as Project;

	// If the project was not found, check the archived projects
	if (!project) {
		project = (await archiveCollection.findOne({ _id: audit.project })) as Project;
		if (!project) return "";
	}

	// Return the message
	const trimmedProjectName =
		project.name.length > 20 ? project.name.substring(0, 20) + "..." : project.name;
	const trimmedName =
		audit.name.length > 15
			? audit.name.charAt(0) + ". " + audit.name.split(" ").slice(-1)
			: audit.name;
	return `Project <b>${trimmedProjectName}</b> was <b>${audit.action}</b> by <b>${trimmedName}</b>`;
}

/**
 * Dashboard home page
 *
 * @returns {JSX.Element} Dashboard home page
 */
export default async function DashboardHome() {
	// Get the user's session
	const session = await auth();

	// Get the recent projects
	const projects = (await getRecentProjects(10)) || [];

	// Get the most recent audit log
	const auditLog = (await getAuditTrail(10)) || [];

	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">
				{getGreeting(session?.user?.name?.split(" ")[0] as string)}
			</h1>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
				<div className="p-5 rounded-lg bg-red-500 text-white shadow-md col-span-5 col-start-1">
					<h2 className="text-md text-medium">
						Warning: Any authenticated user can access and edit portfolio properties.
						RBAC is yet to be implemented, so be cautious when assigning group access in
						your identity provider.
					</h2>
				</div>

				<div className="p-5 rounded-lg bg-white shadow-md col-span-5 col-start-1">
					<h2 className="text-xl text-semibold mb-3">Welcome to your dashboard!</h2>

					<p className="text-gray-600">
						This dashboard can be used to create a variety of projects and manage your
						portfolio. Use the navigation bar to the left to get started.
					</p>
				</div>

				<div className="p-5 rounded-lg shadow-md bg-white col-span-5 lg:col-span-3">
					<h2 className="text-xl text-semibold mb-3">Audit Log</h2>

					{auditLog?.length > 0 && (
						<p className="italic text-gray-500 mb-3">
							View the most recent actions taken in the dashboard
						</p>
					)}

					{auditLog?.map(async (audit, index) => (
						<div
							key={index}
							className="flex justify-between items-center w-full p-2 hover:bg-gray-100 transition-all rounded-lg"
						>
							{audit.project && (
								<p
									className="text-sm text-gray-500"
									dangerouslySetInnerHTML={{
										__html: (await createProjectAuditMessage(audit)) || "",
									}}
								></p>
							)}

							{audit.setting && <p className="text-sm text-gray-500"></p>}

							<p>{moment(audit.timestamp as Date).fromNow()}</p>
						</div>
					))}
				</div>

				<div className="p-5 rounded-lg row-start-3 col-span-5 lg:col-span-2 shadow-md bg-white">
					<h2 className="text-xl text-semibold mb-1">Recent Projects</h2>

					{projects?.length > 0 && (
						<p className="italic text-gray-500 mb-3">
							View your most recently edited projects here
						</p>
					)}

					{projects?.map((project, index) => (
						<Link
							key={project._id.toString()}
							className="mb-3 flex justify-between items-center w-full p-2 hover:bg-gray-100 transition-all rounded-lg"
							href={`/dashboard/editor/${project._id}`}
						>
							<h3 className="text-md text-semibold">
								{index + 1}. {project.name}
							</h3>

							<p>Updated {moment(project.updatedAt as Date).fromNow()}</p>
						</Link>
					))}

					{projects?.length === 0 && (
						<div className="w-full flex py-10 px-5 justify-center items-center">
							<p className="text-gray-500">No projects have been created yet</p>
						</div>
					)}

					{projects?.length > 0 && (
						<Link
							href="/dashboard/projects"
							className="text-gray-500 text-sm hover:underline"
						>
							View all projects
						</Link>
					)}
				</div>
			</div>
		</main>
	);
}
