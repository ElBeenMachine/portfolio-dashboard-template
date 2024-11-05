/**
 * @author Ollie Beenham
 */

"use client";

import { MdDashboard } from "react-icons/md";
import NavButton from "./NavButton";
import ProfileLink from "./ProfileLink";

/**
 * The navigation bar for the dashboard
 *
 * @returns {Promise<JSX.Element>} NavBar component
 */
export default function NavBar() {
	return (
		<nav className="h-dvh bg-gray-800 flex flex-col w-[300px] overflow-hidden select-none">
			<div className="h-24 flex justify-center items-center">
				<img
					src="/img/default-logo.png"
					alt="Dashboard Logo"
					className={"w-12 h-12"}
				/>
			</div>
			<div className="flex-grow">
				<NavButton
					href="/dashboard"
					name="Dashboard">
					<MdDashboard className="w-6 h-6" />
				</NavButton>
			</div>
			<ProfileLink />
		</nav>
	);
}
