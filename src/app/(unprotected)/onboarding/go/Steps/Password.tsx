export default function Password({
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	nextAction,
}: {
	password: string;
	setPassword: (password: string) => void;
	confirmPassword: string;
	setConfirmPassword: (confirmPassword: string) => void;
	nextAction: () => void;
}) {
	function validatePassword() {
		if (password == "") {
			alert("Please enter a password.");
			return false;
		}

		if (confirmPassword == "") {
			alert("Please confirm your password.");
			return false;
		}

		if (password != confirmPassword) {
			alert("Passwords do not match.");
			return false;
		}

		nextAction();
	}

	return (
		<div className="flex flex-col gap-5 mt-5 slideInFromRight">
			<h2 className="text-2xl font-bold">Create a Password</h2>
			<input
				placeholder="Password"
				value={password || ""}
				type="password"
				onChange={(e) => setPassword(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
			/>
			<input
				placeholder="Confirm Password"
				value={confirmPassword || ""}
				type="password"
				onChange={(e) => setConfirmPassword(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
			/>
			<button
				className="self-end px-5 py-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-all"
				onClick={validatePassword}
			>
				Next
			</button>
		</div>
	);
}
