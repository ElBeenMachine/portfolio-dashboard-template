/**
 * @author Ollie Beenham
 */

import { FaMagnifyingGlass } from "react-icons/fa6";
import ProfileButton from "./ProfileButton";

/**
 * Breadcrumbs component for the dashboard
 *
 * @returns {JSX.Element} Breadcrumbs component
 */
export default function Header() {
	return (
		<header className="flex w-[calc(100%-350px)] items-center justify-between flex-nowrap bg-[#F0F0F0] fixed top-0 h-18 z-[1] pr-4 py-4 text-gray-500">
			{/* Search Bar */}
			<div className="flex items-center text-gray-400 rounded-lg focus-within:bg-gray-200 focus-within:text-gray-500 w-full max-w-2xl">
				<FaMagnifyingGlass className="ml-4" />
				<input
					className="rounded-lg w-full px-4 py-2 bg-[#F0F0F0] focus:bg-gray-200 focus:placeholder:text-gray-500 placeholder:text-gray-400 outline-none focus:outline-none h-full"
					placeholder="Click to Search..."
				/>
			</div>
			<ProfileButton />
		</header>
	);
}
