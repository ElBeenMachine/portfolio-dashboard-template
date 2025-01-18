/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { addAuditTrail, updateProject } from "@/lib/db/remote/queries";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * Update a project by ID
 *
 * @param request The request
 * @returns {Response} The response
 */
export async function POST(request: NextRequest) {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the body
	const body = await request.json();

	// Get the id from the body
	const { _id, project } = body;

	// If no id was provided, return a 400 error
	if (!_id) return NextResponse.json({ error: "No project id provided" }, { status: 400 });
	if (!project) return NextResponse.json({ error: "No project provided" }, { status: 400 });

	// Update the project
	const result = await updateProject(new ObjectId(_id), project);

	if (!result) return NextResponse.json({ error: "Failed to update project" }, { status: 500 });

	// Add an audit trail
	await addAuditTrail({
		name: session?.user?.name || "Unknown",
		action: "updated",
		project: new ObjectId(_id),
	});

	// Return the response
	return NextResponse.json({ status: "success" });
}
