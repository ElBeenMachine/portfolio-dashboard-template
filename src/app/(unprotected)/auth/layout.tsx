/**
 * @author Ollie Beenham
 */

import { getSetting } from "@/lib/db/remote/queries";
import "@/styles/default.css";
import { PublicEnvScript } from "next-runtime-env";

/**
 * Metadata for the authentication layout.
 */

export async function generateMetadata() {
	let title;
	try {
		title = (await getSetting("dashboardTitle")).value;
	} catch {
		title = "Dashboard";
	}

	return {
		title: {
			template: `%s | ${title}`,
			default: `Auth | ${title}`,
		},
		icons: {
			icon: `/api/public/dashboard-logo`,
		},
		description: "Please log in to continue.",
	};
}

/**
 * Root layout for the authentication pages of the application.
 *
 * @param {React.ReactNode} children Child elements
 * @returns Document layout
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<PublicEnvScript />
			</head>
			<body id="auth-body" className="antialiased text-white max-h-dvh">
				<div className="w-full h-dvh flex items-center justify-center flex-col bg-black/30">
					{children}
				</div>
			</body>
		</html>
	);
}
