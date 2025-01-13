import CreateButton from "@/components/projects/CreateButton";
import ProjectsPane from "@/components/projects/projectsPane";
import { getAllProjects } from "@/lib/db/remote/queries";
import Project from "@/types/Project";

export default async function AllProjectsPage() {
	const result = await getAllProjects();
	const projects = result?.projects || [];

	return (
		<main>
			<CreateButton />
			<h1 className="text-3xl text-semibold mb-5">All Projects</h1>
			<p className="mb-5">You can see all of your projects below.</p>
			<ProjectsPane projects={projects as Project[]} />
		</main>
	);
}
