/**
 * @author Ollie Beenham
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { capitalise } from "@/lib/StringOperations";

/**
 * Breadcrumbs component for the dashboard
 *
 * @returns {JSX.Element} Breadcrumbs component
 */
export default function Breadcrumbs() {
	// Get the current path
	const path = usePathname();

	// Split the path into parts and create an array of links
	const links = path.split("/").map((part, index, parts) => {
		return {
			name: part,
			url: parts.slice(0, index + 1).join("/"),
		};
	});

	// Remove the first link as it is always empty
	links.shift();

	return (
		<header className="w-full flex items-center flex-nowrap bg-[#FFFFFF] shadow-md fixed top-0 z-10 h-24">
			<ul className="flex flex-nowrap gap-3 w-full text-md px-5 h-max" id="breadcrumbs">
				{links.map((link, index) => (
					<li key={link.name} className="flex gap-3">
						<Link href={link.url} className="hover:text-black transition-all">
							{capitalise(link.name)}
						</Link>
						{index != links.length - 1 ? <p>&gt;</p> : null}
					</li>
				))}
			</ul>
		</header>
	);
}
