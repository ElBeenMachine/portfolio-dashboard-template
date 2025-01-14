/**
 * @author Ollie Beenham
 */

import ProfileButton from "./ProfileButton";

/**
 * Breadcrumbs component for the dashboard
 *
 * @returns {JSX.Element} Breadcrumbs component
 */
export default function Header() {
	return (
		<header className="flex w-[calc(100%-350px)] items-center justify-between flex-nowrap bg-[#F0F0F0] fixed top-0 h-18 z-[1] pr-4 py-4">
			{/* Search Bar */}
			<input
				className="rounded-lg w-full max-w-[500px] bg-gray-200 px-4 py-2 focus:outline-none h-full"
				placeholder="Search..."
			/>
			<ProfileButton />
		</header>
	);
}
