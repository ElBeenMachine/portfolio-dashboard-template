/**
 * @author Ollie Beenham
 */

"use client";

import { MdDashboard, MdSettings } from "react-icons/md";
import NavButton from "./NavButton";
import { useEffect, useState } from "react";
import NavContentType from "@/types/navContentType";
import { FaCode, FaPencilAlt } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { IoMdInfinite } from "react-icons/io";
import { usePathname } from "next/navigation";

// Map of content types to their names, icons, and urls
const contentTypesMap: { [key: string]: NavContentType } = {
	literature: {
		name: "Literature",
		icon: <FaPencilAlt className="w-6 h-6" />,
		url: "/dashboard/literature",
	},
	code: {
		name: "Code",
		icon: <FaCode className="w-6 h-6" />,
		url: "/dashboard/code",
	},
	blog: {
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
export default function NavBar({ title }: { title: string }) {
	const [types, setTypes] = useState<{ type: string; enabled: boolean }[]>([]);
	const currentPath = usePathname();

	// Get the available content types from the database
	useEffect(() => {
		try {
			fetch("/api/config/content-types")
				.then((res) => res.json())
				.then((data) => {
					setTypes(
						data.filter((x: { type: string; enabled: boolean }) => {
							return x.enabled === true;
						})
					);
				});
		} catch (error) {
			console.error(error);
		}

		return () => {
			setTypes([]);
		};
	}, []);

	return (
		<nav
			className={`w-[225px] lg:w-[350px] flex flex-col bg-none text-[#202020] transition-all h-full fixed`}
		>
			{/* <NavToggle collapsed={collapsed} setCollapsed={setCollapsed} /> */}
			<div className="h-max px-4 flex justify-start items-center relative gap-5 mb-14 mt-4">
				<img
					src={"/api/public/dashboard-logo"}
					alt="Dashboard Logo"
					className={"w-16 h-16 transition-all"}
				/>
				<h2 className="text-xl font-bold">{title}</h2>
			</div>
			<div className="flex-grow px-4 flex flex-col gap-2 pb-4">
				<NavButton
					href="/dashboard"
					name="Dashboard"
					isActive={currentPath === "/dashboard"}
				>
					<MdDashboard className="w-6 h-6" />
				</NavButton>
				<NavButton
					href="/dashboard/projects"
					name="All Projects"
					isActive={currentPath === "/dashboard/projects"}
				>
					<IoMdInfinite className="w-6 h-6" />
				</NavButton>
				{types.length > 1 &&
					types.map((type) => {
						const contentType = contentTypesMap[type.type];
						if (!contentType) {
							return null; // Skip rendering if type is not found
						}
						return (
							<NavButton
								key={contentType.name}
								name={contentType.name}
								href={contentType.url}
								isActive={currentPath === contentType.url}
							>
								{contentType.icon}
							</NavButton>
						);
					})}
				<div className="flex-grow"></div>
				<NavButton
					href="/dashboard/settings"
					name="Settings"
					isActive={currentPath === "/dashboard/settings"}
				>
					<MdSettings className="w-6 h-6" />
				</NavButton>
			</div>
		</nav>
	);
}
