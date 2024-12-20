/**
 * @author Ollie Beenham
 */

import { getAuthBackground } from "@/lib/db/local/queries";
import { redirect } from "next/navigation";

/**
 * API Route to get the auth background
 *
 * @returns {Promise<NextResponse>} The response containing the background
 */
export async function GET() {
	const { url } = await getAuthBackground();
	redirect(url);
}
