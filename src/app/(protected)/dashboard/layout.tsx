/**
 * @author Ollie Beenham
 */

import "@/styles/default.css";

import { PublicEnvScript } from "next-runtime-env";
import NavBar from "@/components/navigation/NavBar";
import { SessionProvider } from "next-auth/react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { getInstanceID, getOnboardedState, getTitle } from "@/lib/db/local/queries";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

/**
 * Metadata for the dashboard layout.
 */
export async function generateMetadata() {
	let title;
	try {
		title = (await getTitle()).title;
	} catch {
		title = "Dashboard";
	}

	return {
		title: {
			template: `%s | ${title}`,
			default: `Home | ${title}`,
		},
		icons: {
			icon: `/api/public/dashboard-logo`,
		},
	};
}

/**
 * Dashboard layout for the application.
 *
 * @param {React.ReactNode} children Child elements
 * @returns Document layout
 */
export default async function DashLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const onboardedState = await getOnboardedState();
	if (!onboardedState) return redirect("/onboarding");

	const { instanceID } = await getInstanceID();
	return (
		<html lang="en">
			<head>
				<PublicEnvScript />
			</head>
			<body className={"flex w-full flex-nowrap"}>
				<ToastContainer position="bottom-right" />
				<SessionProvider>
					<NavBar />
					<main className="flex-grow h-dvh flex flex-col overflow-auto bg-white text-[#202020] relative">
						<Breadcrumbs />
						<div className="p-5 z-0 mt-24 flex-grow">{children}</div>
						<p className="text-center text-xs text-gray-500 py-2">
							Instance ID: {instanceID}
						</p>
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
