/**
 * @author Ollie Beenham
 */

import { deleteProjectById } from "@/lib/db/remote/queries";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";

/**
 * Delete a project by ID
 *
 * @param request The request
 * @returns {Response} The response
 */
export async function DELETE(request: NextRequest) {
	// Get the body
	const body = await request.json();

	// Get the id from the body
	const { _id } = body;

	// If no id was provided, return a 400 error
	if (!_id) return Response.json({ error: "No project id provided" }, { status: 400 });

	// Delete the project
	const result = await deleteProjectById(new ObjectId(_id));

	if (!result) return Response.json({ error: "Failed to delete project" }, { status: 500 });

	// Return the response
	return Response.json({ status: "success" });
}
