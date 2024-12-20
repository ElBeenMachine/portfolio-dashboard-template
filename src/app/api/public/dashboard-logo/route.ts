/**
 * @author Ollie Beenham
 */

import { getLogo } from "@/lib/db/local/queries";
import { redirect } from "next/navigation";

/**
 * API Route to get the dashboard icon
 *
 * @returns {Promise<NextResponse>} The response containing the logo
 */
export async function GET() {
	const { logo } = await getLogo();
	redirect(logo);
}
