"use client";

import { usePathname } from "next/navigation";
import OnboardingNavigation from "./Navigation";
import { useEffect, useState } from "react";

const pages = [
	{
		id: 1,
		href: "/onboarding/1",
		title: "Step 1",
	},
	{
		id: 1,
		href: "/onboarding/2",
		title: "Step 2",
	},
	{
		id: 1,
		href: "/onboarding/3",
		title: "Step 3",
	},
	{
		id: 1,
		href: "/onboarding/4",
		title: "Step 4",
	},
];

export default function OnboardingForm() {
	const [pageNo, setPageNo] = useState<number>(0);
	const pathNo = parseInt(usePathname().split("/")[2]);

	useEffect(() => {
		setPageNo(pathNo);

		return () => {
			setPageNo(0);
		};
	}, []);

	return (
		<>
			<h1 className="text-6xl font-bold">Onboarding Page {pageNo}</h1>

			<OnboardingNavigation pages={pages} pageNo={pageNo} setPageNo={setPageNo} />
		</>
	);
}
