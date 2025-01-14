/**
 * @author Ollie Beenham
 */

import "@/styles/default.css";

import { PublicEnvScript } from "next-runtime-env";
import NavBar from "@/components/navigation/NavBar";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/navigation/Header";
import { getInstanceID } from "@/lib/db/local/queries";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";
import { getSetting } from "@/lib/db/remote/queries";
import { auth } from "@/lib/auth/auth";

// Get the version from package.json
import packageJson from "../../../../package.json";
const { version } = packageJson;

/**
 * Metadata for the dashboard layout.
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
	// Check to see if the app has been onboarded
	const onboardedState = (await getSetting("onboarded")).value;
	if (!onboardedState) return redirect("/onboarding");

	// Get the page title
	const title = (await getSetting("dashboardTitle")).value;

	// Get the instance ID
	const instanceID = await getInstanceID();

	// If the user is not authenticated, redirect to the login page
	const session = await auth();
	if (!session) return redirect(`/auth/login`);

	return (
		<html lang="en">
			<head>
				<PublicEnvScript />
			</head>
			<body className={"bg-[#F0F0F0] text-[#202020]"}>
				<ToastContainer position="bottom-right" />
				<SessionProvider>
					<div className="h-dvh w-dvw">
						<NavBar title={title as string} />
						<div className="flex flex-col h-dvh justify-start ml-[225px] lg:ml-[350px] pr-4 overflow-hidden transition-all relative">
							<Header />
							<main className="flex flex-col flex-grow relative mt-20 overflow-y-auto">
								{children}
								<div className="flex-grow"></div>
								<div className="w-full flex flex-col md:flex-row justify-center items-center md:gap-5">
									<p className="text-center text-xs text-gray-500 md:py-2">
										Instance ID: {instanceID}
									</p>
									<p className="text-center text-xs text-gray-500 py-2 hidden md:block">
										|
									</p>
									<p className="text-center text-xs text-gray-500 md:py-2">
										Version: {version}
									</p>
								</div>
							</main>
						</div>
					</div>
					{/* <main className="flex flex-col flex-grow relative">
							<Breadcrumbs />
							<div className="p-5 z-0 mt-24 flex-grow">{children}</div>
						</main> */}
				</SessionProvider>
			</body>
		</html>
	);
}
