/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { getRecentProjects } from "@/lib/db/remote/queries";
import { getGreeting } from "@/lib/greetings";
import moment from "moment";
import Link from "next/link";

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

	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">
				{getGreeting(session?.user?.name?.split(" ")[0] as string)}
			</h1>

			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
				<div className="p-5 rounded-md bg-red-500 text-white shadow-md col-span-3 col-start-1">
					<h2 className="text-md text-medium">
						Warning: Any authenticated user can access and edit portfolio properties.
						RBAC is yet to be implemented, so be cautious when assigning group access in
						your identity provider.
					</h2>
				</div>

				<div className="p-5 rounded-md bg-white shadow-md col-span-3 col-start-1">
					<h2 className="text-xl text-semibold mb-3">Welcome to your dashboard!</h2>

					<p className="text-gray-600">
						This dashboard can be used to create a variety of projects and manage your
						portfolio. Use the navigation bar to the left to get started.
					</p>
				</div>

				<div className="p-5 rounded-md row-span-1 shadow-md bg-white col-span-2 lg:col-span-1">
					<h2 className="text-xl text-semibold mb-3">Audit Log</h2>
				</div>

				<div className="p-5 rounded-md row-start-3 col-span-2 shadow-md bg-white">
					<h2 className="text-xl text-semibold mb-1">Recent Projects</h2>

					{projects?.length > 0 && (
						<p className="italic text-gray-500 mb-3">
							View your most recently edited projects here
						</p>
					)}

					{projects?.map((project, index) => (
						<Link
							key={project._id.toString()}
							className="mb-3 flex justify-between items-center w-full p-2 hover:bg-gray-100 transition-all rounded-md"
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
