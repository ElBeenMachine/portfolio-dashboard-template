"use client";

import { useSession } from "next-auth/react";

export default function ProfileButton() {
	// Get the user's session
	const { data: session } = useSession();

	return (
		<div className="flex items-center gap-5">
			<p>{session?.user?.name}</p>
			<img
				src={`${session?.user?.image}`}
				alt="User image"
				className="rounded-full w-auto h-10"
			/>
		</div>
	);
}
