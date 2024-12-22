/**
 * @author Ollie Beenham
 */

import { createBlankProject } from "@/lib/db/remote/queries";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	// Get the body
	const body = await request.json();

	// Get the url from the body
	const title = body.title || "Untitled Project";
	const type = body.type;

	// If no type was provided, return a 400 error
	if (!type) return Response.json({ error: "No project type provided" }, { status: 400 });

	// Create the project
	const result = await createBlankProject(type, title);
	if (!result) return Response.json({ error: "Failed to create project" }, { status: 500 });

	// Log the project
	const { project } = result;
	console.log(project);

	// Return the response
	return Response.json({ status: "success", _id: project.insertedId });
}
