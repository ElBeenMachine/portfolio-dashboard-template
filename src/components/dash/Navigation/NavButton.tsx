/**
 * @author Ollie Beenham
 */

import Link from "next/link";

/**
 * A button that links to a page on the navbar
 *
 * @param {React.ReactNode} children The children of the component
 * @param {string} href The link of the component
 * @param {string} name The name of the link
 * @returns {Promise<JSX.Element>} NavButton component
 */
export default function NavButton({
	children,
	href,
	name,
	collapsed,
}: {
	children?: React.ReactNode;
	href: string;
	name: string;
	collapsed: boolean;
}) {
	return (
		<Link
			className="bg-gray-800 hover:bg-gray-700 transition-all w-full px-5 min-h-16 py-2 flex gap-5 flex-nowrap items-center justify-center"
			href={href}>
			{children}
			{!collapsed && (
				<p className="flex-grow whitespace-nowrap">{name}</p>
			)}
		</Link>
	);
}
