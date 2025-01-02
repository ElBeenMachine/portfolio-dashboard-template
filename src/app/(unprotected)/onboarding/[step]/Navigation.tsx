"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const pages = [
	{
		href: "/onboarding/1",
		title: "Step 1",
	},
	{
		href: "/onboarding/2",
		title: "Step 2",
	},
	{
		href: "/onboarding/3",
		title: "Step 3",
	},
	{
		href: "/onboarding/4",
		title: "Step 4",
	},
];

export default function OnboardingNavigation() {
	const path = usePathname();
	const currentPath = parseInt(path.split("/")[2]);

	return (
		<div
			className="w-full absolute bottom-0 left-0 flex items-center justify-center p-10"
			id="onboarding-nav"
		>
			<div className="w-1/3 flex justify-center items-center gap-5">
				<div className="w-9 flex items-center justify-center">
					{currentPath > 1 && (
						<Link href={`/onboarding/${currentPath - 1}`}>
							<FaChevronLeft className="text-white text-2xl mr-10" />
						</Link>
					)}
				</div>

				{pages.map((page, index) => (
					<div className="w-9 flex items-center justify-center" key={index}>
						<Link
							className={`h-3 rounded-full bg-white transition-all ${
								path === page.href ? "w-full" : "w-3 hover:scale-150 "
							}`}
							href={page.href}
						></Link>
					</div>
				))}

				<div className="w-9 flex items-center justify-center">
					{currentPath < pages.length && (
						<Link href={`/onboarding/${currentPath + 1}`}>
							<FaChevronRight className="text-white text-2xl transform ml-10" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
