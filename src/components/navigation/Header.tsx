/**
 * @author Ollie Beenham
 */

import ProfileButton from "./ProfileButton";
import GlobalSearch from "./Search/GlobalSearch";

/**
 * Breadcrumbs component for the dashboard
 *
 * @returns {JSX.Element} Breadcrumbs component
 */
export default function Header() {
	return (
		<header className="flex w-[calc(100%-225px)] lg:w-[calc(100%-350px)] items-center justify-end lg:justify-between flex-nowrap bg-[#F0F0F0] fixed top-0 h-18 z-[1] pr-4 py-4 text-gray-500">
			<GlobalSearch />
			<ProfileButton />
		</header>
	);
}
