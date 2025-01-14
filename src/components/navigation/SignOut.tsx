/**
 * @author Ollie Beenham
 */

import { signOut } from "next-auth/react";
import { ImExit } from "react-icons/im";

/**
 * A button that logs the user out
 *
 * @returns {Promise<JSX.Element>} SignOut component
 */
export default function SignOut() {
	return (
		<button
			onClick={() => signOut({ callbackUrl: "/" })}
			className={`transition-all w-full px-5 min-h-16 py-2 rounded-lg flex gap-5 flex-nowrap items-center justify-center hover:bg-accent-hover`}
		>
			<ImExit className="w-6 h-6" />
			<p className="flex-grow whitespace-nowrap w-max text-left">Logout</p>
		</button>
	);
}
