import { testConnectionString } from "@/lib/db/remote";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const { connectionString } = await req.json();
		const isValid = await testConnectionString(connectionString);
		if (!isValid)
			return NextResponse.json(
				{ isValid: false, message: "Invalid connection string" },
				{ status: 400 }
			);
		return NextResponse.json({ isValid: true }, { status: 200 });
	} catch {
		return NextResponse.json({ isValid: false }, { status: 400 });
	}
};
