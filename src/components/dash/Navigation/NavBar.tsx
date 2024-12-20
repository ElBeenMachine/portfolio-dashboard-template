/**
 * @author Ollie Beenham
 */

"use client";

import { MdDashboard, MdSettings } from "react-icons/md";
import NavButton from "./NavButton";
import ProfileLink from "./ProfileLink";
import { useEffect, useState } from "react";
import NavToggle from "./NavToggle";
import NavContentType from "@/types/navContentType";
import { FaCode, FaPencilAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";

// Map of content types to their names, icons, and urls
const contentTypesMap: { [key: string]: NavContentType } = {
	"literature": {
		name: "Literature",
		icon: <FaPencilAlt className="w-6 h-6" />,
		url: "/dashboard/literature",
	},
	"code": {
		name: "Code",
		icon: <FaCode className="w-6 h-6" />,
		url: "/dashboard/code",
	},
	"blog": {
		name: "Blog",
		icon: <FaNoteSticky className="w-6 h-6" />,
		url: "/dashboard/blog",
	},
};

/**
 * The navigation bar for the dashboard
 *
 * @returns {Promise<JSX.Element>} NavBar component
 */
export default function NavBar() {
	const [collapsed, setCollapsed] = useState(false);
	const [types, setTypes] = useState<string[]>([]);

	// Get the available content types from the database
	useEffect(() => {
		try {
			fetch("/api/config/content-types").then((res) => res.json()).then((data) => {
				setTypes(data.contentTypes);
			});
		} catch (error) {
			console.error(error);
		}

		return () => {
			setTypes([]);
		}
	}, []);

	return (
		<nav
			className={`h-dvh bg-gray-800 flex flex-col ${
				collapsed ? "w-[100px]" : "w-[300px]"
			} overflow-hidden select-none transition-all text-white`}>
			<div className="h-24 flex justify-center items-center relative">
				<NavToggle
					collapsed={collapsed}
					setCollapsed={setCollapsed}
				/>
				<img
					src={"/api/public/dashboard-logo"}
					alt="Dashboard Logo"
					className={
						(collapsed ? "w-8 h-8" : "w-12 h-12") +
						" transition-all"
					}
				/>
			</div>
			<div className="flex-grow">
				<NavButton
					href="/dashboard"
					name="Dashboard"
					collapsed={collapsed}>
					<MdDashboard className="w-6 h-6" />
				</NavButton>
				{types.map((type) => (
					<NavButton
						key={contentTypesMap[type].name}
						name={contentTypesMap[type].name}
						href={contentTypesMap[type].url}
						collapsed={collapsed}>
						{contentTypesMap[type].icon}
					</NavButton>
				))}
				<NavButton
					href="/dashboard/settings"
					name="Settings"
					collapsed={collapsed}>
					<MdSettings className="w-6 h-6" />
				</NavButton>
			</div>
			<ProfileLink collapsed={collapsed} />
		</nav>
	);
}
