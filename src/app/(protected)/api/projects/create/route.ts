/**
 * @author Ollie Beenham
 */

import { auth } from "@/lib/auth/auth";
import { addAuditTrail, createBlankProject } from "@/lib/db/remote/queries";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	// Get the session
	const session = await auth();
	if (!session) return NextResponse.json({ error: "Unauthorised request" }, { status: 401 });

	// Get the body
	const body = await request.json();

	// Get the url from the body
	const title = body.title || "Untitled Project";
	const type = body.type;

	// If no type was provided, return a 400 error
	if (!type) return NextResponse.json({ error: "No project type provided" }, { status: 400 });

	// Create the project
	const result = await createBlankProject(type, title);
	if (!result) return NextResponse.json({ error: "Failed to create project" }, { status: 500 });

	// Log the project
	const { project } = result;

	// Add an audit trail
	await addAuditTrail({
		name: session?.user?.name || "Unknown",
		action: "created",
		project: project.insertedId,
	});

	// Return the response
	return NextResponse.json({ status: "success", _id: project.insertedId });
}
