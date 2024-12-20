/**
 * @author Ollie Beenham
 */

/**
 * Code project card component
 *
 * @param {Object} project The project to display
 * @returns {JSX.Element} A project card
 */
function ProjectCard({ project }: { project: any }) {
	// Define the initial status and colour
	let status = project.status;
	let col = "text-black-500";

	// Determine colour and status text based on project status
	switch (status) {
		case "live":
			col = "text-green-500";
			status = "Live";
			break;
		case "draft":
			col = "text-gray-500";
			status = "Draft";
			break;
		case "archived":
			col = "text-red-500";
			status = "Archived";
			break;
		default:
			col = "black";
			break;
	}

	return (
		<a
			href={`/dashboard/editor/code/${project._id}`}
			className="cols-span-1 bg-white shadow-md rounded-md overflow-hidden hover:scale-[1.02] hover:cursor-pointer transition-all"
		>
			<img src={project.thumbnail} className="h-40 w-full object-cover object-center" />
			<div className="p-4">
				<h2 className="text-lg font-medium">{project.name}</h2>
				<p className={`${col} mb-2`}>{status}</p>
				<p>{project.description}</p>
			</div>
		</a>
	);
}

/**
 * Code projects pane component
 *
 * @param {Array} projects An array of code-based projects to display
 * @returns {JSX.Element} A code projects pane
 */
export default function ProjectsPane({ projects }: { projects: any }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full h-auto">
			{projects.map((project: any) => (
				<ProjectCard key={project._id} project={project} />
			))}
		</div>
	);
}
