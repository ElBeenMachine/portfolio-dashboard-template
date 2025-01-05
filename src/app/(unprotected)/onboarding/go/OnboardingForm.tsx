"use client";

import { useState } from "react";
import PersonalDetails from "./Steps/PersonalDetails";
import Username from "./Steps/Username";
import Password from "./Steps/Password";
import DatabaseConnection from "./Steps/DatabaseConnection";
import OnboardingBullets from "./Bullets";
import Email from "./Steps/Email";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
	const router = useRouter();

	const [pageNo, setPageNo] = useState<number>(0);

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");

	const [email, setEmail] = useState<string>("");

	const [username, setUsername] = useState<string>("");

	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [connectionString, setConnectionString] = useState<string>("");

	function completeOnboarding() {
		const onboardingData = {
			firstName,
			lastName,
			username,
			password,
			connectionString,
		};

		console.log(onboardingData);
		fetch("/api/public/pass-onboarding", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(onboardingData),
		}).then((res) => {
			if (res.status === 200) {
				router.push("/dashboard");
			} else {
				alert("An unexpected server error occurred");
			}
		});
	}

	const pages = [
		{
			content: (
				<PersonalDetails
					firstName={firstName}
					lastName={lastName}
					setFirstName={setFirstName}
					setLastName={setLastName}
					nextAction={() => setPageNo(pageNo + 1)}
				/>
			),
		},
		{
			content: (
				<Email email={email} setEmail={setEmail} nextAction={() => setPageNo(pageNo + 1)} />
			),
		},
		{
			content: (
				<Username
					username={username}
					setUserName={setUsername}
					nextAction={() => setPageNo(pageNo + 1)}
				/>
			),
		},
		{
			content: (
				<Password
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					nextAction={() => setPageNo(pageNo + 1)}
				/>
			),
		},
		{
			content: (
				<DatabaseConnection
					connectionString={connectionString}
					setConnectionString={setConnectionString}
					nextAction={completeOnboarding}
				/>
			),
		},
	];

	return (
		<>
			{pageNo != null ? pages[pageNo].content : null}

			<OnboardingBullets pages={pages} pageNo={pageNo} setPageNo={setPageNo} />
		</>
	);
}
