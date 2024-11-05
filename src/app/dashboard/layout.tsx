/**
 * @author Ollie Beenham
 */

import "@/styles/default.css";
import "@/styles/dashboard.css";

import { PublicEnvScript } from "next-runtime-env";
import NavBar from "@/components/dash/Navigation/NavBar";
import { SessionProvider } from "next-auth/react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/dash/Navigation/Breadcrumbs";

/**
 * Metadata for the dashboard layout.
 */
export const metadata: Metadata = {
	title: {
		template: "%s | My Dashboard",
		default: "Home | My Dashboard",
	},
};

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
	return (
		<html lang="en">
			<head>
				<PublicEnvScript />
			</head>
			<body className={"flex w-full flex-nowrap"}>
				<SessionProvider>
					<NavBar />
					<main className="w-full h-dvh flex flex-col overflow-auto bg-white text-[#202020]">
						<Breadcrumbs />
						<div className="p-5 z-0 mt-24 flex-grow">
							{children}
						</div>
					</main>
				</SessionProvider>
			</body>
		</html>
	);
}
