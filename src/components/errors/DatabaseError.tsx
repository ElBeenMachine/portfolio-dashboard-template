/**
 * @author Ollie Beenham
 */

import { BsDatabaseFillX } from "react-icons/bs";

export default function DatabaseErrorMessage() {
	return (
		<div className="text-center h-full flex flex-col justify-center items-center gap-5">
			<BsDatabaseFillX className="text-7xl mb-5" />
			<h1 className="text-3xl text-semibold">Database Error</h1>
			<p>
				An error occurred whilst trying to access to the database. Please check the server
				logs and try again later.
			</p>
		</div>
	);
}
