export default function Username({
	username,
	setUserName,
	nextAction,
}: {
	username: string;
	setUserName: (username: string) => void;
	nextAction: () => void;
}) {
	function validateUsername() {
		if (username == "") {
			alert("Please enter a username.");
			return false;
		}

		nextAction();
	}

	return (
		<div className="flex flex-col gap-5 mt-5 slideInFromRight">
			<h2 className="text-2xl font-bold">Create a Username</h2>
			<input
				placeholder="Username"
				value={username || ""}
				onChange={(e) => setUserName(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
				autoFocus
			/>
			<button
				onClick={validateUsername}
				className="self-end px-5 py-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-all"
				id="onboarding-next"
			>
				Next
			</button>
		</div>
	);
}
