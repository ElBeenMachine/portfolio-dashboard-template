import { useState } from "react";

export default function DatabaseConnection({
	connectionString,
	setConnectionString,
	nextAction,
}: {
	connectionString: string;
	setConnectionString: (username: string) => void;
	nextAction: () => void;
}) {
	const [validConnectionString, setValidConnectionString] = useState<boolean>(false);
	const [testingConnection, setTestingConnection] = useState<boolean>(false);

	function testConnection() {
		if (connectionString == "") {
			alert("Please enter a MongoDB connection string.");
			return false;
		}

		if (
			connectionString.startsWith("mongodb://") ||
			connectionString.startsWith("mongodb+srv://")
		) {
			setTestingConnection(true);

			fetch("/api/public/validate-connection-string", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ connectionString }),
			})
				.then((res) => {
					if (res.status === 200) {
						setValidConnectionString(true);
					}

					if (res.status === 400) {
						alert("Invalid connection string.");
					}
				})
				.finally(() => {
					setTestingConnection(false);
				});
		}
	}

	function validateConnectionString() {
		if (validConnectionString) nextAction();
	}

	return (
		<div className="flex flex-col gap-5 mt-5 slideInFromRight">
			<h2 className="text-2xl font-bold">Enter a MongoDB connection string</h2>
			<a
				href="https://www.mongodb.com/docs/manual/reference/connection-string/"
				target="_blank"
				className="opacity-40 text-gray-200 hover:opacity-20 transition-all -mt-5 underline w-max"
			>
				What is a MongoDB connection string?
			</a>
			<input
				placeholder="mongodb://localhost:27017"
				value={connectionString || ""}
				onChange={(e) => {
					setConnectionString(e.target.value);
					setTestingConnection(false);
					setValidConnectionString(false);
				}}
				className="w-full bg-gray-600 px-5 py-4 rounded-md"
				disabled={testingConnection}
			/>
			<div className="flex self-end justify-center items-center gap-5">
				<button
					onClick={testConnection}
					className={`px-5 py-3 bg-gray-600 rounded-md ${
						testingConnection || !connectionString
							? "opacity-40"
							: "hover:bg-gray-500 transition-all"
					}`}
					disabled={testingConnection || !connectionString}
				>
					{" "}
					Test Connection
				</button>
				<button
					onClick={validateConnectionString}
					className={`px-5 py-3 bg-gray-600 rounded-md ${
						!validConnectionString ? "opacity-40" : "hover:bg-gray-500 transition-all"
					}`}
					disabled={!validConnectionString}
				>
					Next
				</button>
			</div>
		</div>
	);
}
