/**
 * @author Ollie Beenham
 */

import { useSession } from "next-auth/react";
import NavButton from "./NavButton";
import Skeleton from "@/components/Skeleton";

function ProfileSkeleton() {
	return (
		<div className="w-full flex items-center h-16 p-5 gap-5">
			<Skeleton className="rounded-full w-10 h-10" />
			<Skeleton className="flex-grow h-5 rounded-md" />
		</div>
	);
}

export default function ProfileLink({ collapsed }: { collapsed: boolean }) {
	// Get the user's session
	const { data: session, status } = useSession();

	// If the session is loading, show a skeleton
	if (status === "loading") return <ProfileSkeleton />;

	// If the session is not loading, show the user's profile
	return (
		<NavButton href="/dashboard/profile" name={`${session?.user?.name}`} collapsed={collapsed}>
			<img
				src={`${session?.user?.image}`}
				alt="User image"
				className="rounded-full w-10 h-10"
			/>
		</NavButton>
	);
}
