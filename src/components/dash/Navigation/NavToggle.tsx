/**
 * @author Ollie Beenham
 */

import { Dispatch, SetStateAction, useEffect } from "react";
import { IoMdArrowDropleft } from "react-icons/io";

/**
 * A button that toggles the navbar collapsed state
 *
 * @param {boolean} collapsed The current state of the navbar
 * @param {Dispatch<SetStateAction<boolean>>} setCollapsed The function to set the state of the navbar
 * @returns {Promise<JSX.Element>} NavToggle component
 */
export default function NavToggle({
	collapsed,
	setCollapsed,
}: {
	collapsed: boolean;
	setCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
	// Load in the nav collapsed state
	useEffect(() => {
		const navState = localStorage.getItem("navCollapsed");
		if (navState) {
			setCollapsed(JSON.parse(navState));
		}
	}, [setCollapsed]);

	/**
	 * 
	 * @param {string} state The state to set 
	 */
	function saveState(state: boolean) {
		localStorage.setItem("navCollapsed", JSON.stringify(state));
		setCollapsed(state);
	}

	return (
		<button
			onClick={() => saveState(!collapsed)}
			className={`absolute top-0 right-0 bg-none hover:bg-gray-700 transition-all w-max h-max p-1 flex gap-5 flex-nowrap items-center justify-center `}>
			<IoMdArrowDropleft
				className={`${collapsed ? "rotate-180" : null} transition-all`}
			/>
		</button>
	);
}
