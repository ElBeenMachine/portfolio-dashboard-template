export default function Email({
	email,
	setEmail,
	nextAction,
}: {
	email: string;
	setEmail: (email: string) => void;
	nextAction: () => void;
}) {
	function validateEmail() {
		if (email == "") {
			alert("Please enter an email address.");
			return false;
		}

		// Validate email syntax
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert("Please enter a valid email address.");
			return false;
		}

		nextAction();
	}

	return (
		<div className="flex flex-col gap-5 mt-5 slideInFromRight">
			<h2 className="text-2xl font-bold">What is your email address?</h2>
			<input
				placeholder="hello@example.com"
				value={email || ""}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
			/>
			<button
				onClick={validateEmail}
				className="self-end px-5 py-3 bg-gray-600 rounded-md hover:bg-gray-500 transition-all"
			>
				Next
			</button>
		</div>
	);
}
