import { createAdminUser } from "@/lib/auth/auth";
import { getSetting, updateSetting } from "@/lib/db/remote/queries";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	// See if the dashboard has been onboarded
	const onboarded = (await getSetting("onboarded")).value;
	if (onboarded) return NextResponse.json({ message: "Already onboarded" }, { status: 403 });

	// Get the body
	const body = await req.json();

	// Deserialise the body
	const { username, password, email, firstName, lastName, role } = body;

	// Try to update the onboarding state
	try {
		// Create the admin user
		const response = await createAdminUser({
			username,
			password,
			email,
			firstName,
			lastName,
			role,
		});

		// If the resposne is false, return an error
		if (!response)
			return NextResponse.json({ error: "Failed to create user" }, { status: 500 });

		// Update the state
		await updateSetting("onboarded", true);

		// Return the update response
		return NextResponse.json({ message: "Onboarding complete" });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
};
