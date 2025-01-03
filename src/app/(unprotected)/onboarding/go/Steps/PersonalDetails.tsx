export default function PersonalDetails({
	firstName,
	lastName,
	setFirstName,
	setLastName,
	nextAction,
}: {
	firstName: string;
	lastName: string;
	setFirstName: (firstName: string) => void;
	setLastName: (lastName: string) => void;
	nextAction: () => void;
}) {
	function validateName() {
		if (firstName == "" || lastName == "") {
			alert("Please enter your first and last name.");
			return false;
		}

		nextAction();
	}

	return (
		<div className="flex flex-col gap-5 mt-5 slideInFromRight">
			<h2 className="text-2xl font-bold">What is your name?</h2>
			<input
				placeholder="First Name"
				value={firstName || ""}
				onChange={(e) => setFirstName(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
			/>
			<input
				placeholder="Last Name"
				value={lastName || ""}
				onChange={(e) => setLastName(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
			/>
			<button
				onClick={validateName}
				className="self-end px-5 py-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-all"
			>
				Next
			</button>
		</div>
	);
}
