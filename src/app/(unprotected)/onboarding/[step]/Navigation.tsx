"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function OnboardingNavigation({
	pages,
	pageNo,
	setPageNo,
}: {
	pages: { id: number; href: string; title: string }[];
	pageNo: number;
	setPageNo: (pageNo: number) => void;
}) {
	return (
		<div
			className="w-full absolute bottom-0 left-0 flex items-center justify-center p-10"
			id="onboarding-nav"
		>
			<div className="w-1/3 flex justify-center items-center gap-5">
				<div className="w-9 flex items-center justify-center">
					{pageNo > 1 && (
						<Link
							href={`/onboarding/${pageNo - 1}`}
							onClick={() => setPageNo(pageNo - 1)}
						>
							<FaChevronLeft className="text-white text-2xl mr-10" />
						</Link>
					)}
				</div>

				{pages.map((page, index) => (
					<div className="w-9 flex items-center justify-center" key={index}>
						<Link
							className={`h-3 rounded-full bg-white transition-all ${
								pageNo === index + 1 ? "w-full" : "w-3 hover:scale-150 "
							}`}
							href={page.href}
							onClick={() => setPageNo(index + 1)}
						></Link>
					</div>
				))}

				<div className="w-9 flex items-center justify-center">
					{pageNo < pages.length && (
						<Link
							href={`/onboarding/${pageNo + 1}`}
							onClick={() => setPageNo(pageNo + 1)}
						>
							<FaChevronRight className="text-white text-2xl transform ml-10" />
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}
