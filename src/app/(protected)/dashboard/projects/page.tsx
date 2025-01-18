import CreateButton from "@/components/projects/CreateButton";
import ProjectsPane from "@/components/projects/projectsPane";
import { getAllProjects } from "@/lib/db/remote/queries";
import Project from "@/types/project.interface";

export default async function AllProjectsPage() {
	const result = await getAllProjects();
	const projects = result?.projects || [];

	return (
		<div>
			<h1 className="text-3xl text-semibold mb-5">All Projects</h1>
			<div className="bg-white rounded-lg p-5 relative">
				<CreateButton />
				<p className="mb-10">You can see all of your projects below.</p>
				<ProjectsPane projects={projects as Project[]} />
			</div>
		</div>
	);
}
