import { getOnboardedState, setOnboardedState, updateMongoURI } from "@/lib/db/local/queries";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	// See if the dashboard has been onboarded
	const onboarded = await getOnboardedState();
	if (onboarded) return NextResponse.json({ message: "Already onboarded" }, { status: 403 });

	// Get the body
	const body = await req.json();

	// Deserialise the body
	const { firstName, lastName, username, password, connectionString } = body;

	// Log the data
	console.log({ firstName, lastName, username, password, connectionString });

	// Try to update the onboarding state
	try {
		// Update the state
		await setOnboardedState(true);
		await updateMongoURI(connectionString);

		// Return the update response
		return NextResponse.json({ message: "Onboarding complete" });
	} catch {
		return NextResponse.json({ error: "An unexpected server error occurred" }, { status: 500 });
	}
};
