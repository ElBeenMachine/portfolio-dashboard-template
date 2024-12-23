/**
 * @author Ollie Beenham
 */

import { updateProject } from "@/lib/db/remote/queries";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

/**
 * Update a project by ID
 *
 * @param request The request
 * @returns {Response} The response
 */
export async function POST(request: NextRequest) {
	// Get the body
	const body = await request.json();

	// Get the id from the body
	const { _id, project } = body;

	// If no id was provided, return a 400 error
	if (!_id) return Response.json({ error: "No project id provided" }, { status: 400 });
	if (!project) return Response.json({ error: "No project provided" }, { status: 400 });

	// Update the project
	const result = await updateProject(new ObjectId(_id), project);

	if (!result) return Response.json({ error: "Failed to update project" }, { status: 500 });

	// Return the response
	return Response.json({ status: "success" });
}
