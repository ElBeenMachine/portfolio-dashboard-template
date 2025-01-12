"use client";

export default function OnboardingBullets({
	pages,
	pageNo,
}: {
	pages: { content: React.JSX.Element }[];
	pageNo: number;
	setPageNo: (pageNo: number) => void;
}) {
	return (
		<div
			className="w-full absolute bottom-0 left-0 flex items-center justify-center p-10"
			id="onboarding-nav"
		>
			<div className="w-1/3 flex justify-center items-center gap-5">
				{pages.map((page, index) => (
					<div className="w-9 flex items-center justify-center" key={index}>
						<span
							className={`h-3 rounded-full bg-white transition-all ${
								pageNo === index ? "w-full" : "w-3"
							}`}
						></span>
					</div>
				))}
			</div>
		</div>
	);
}
