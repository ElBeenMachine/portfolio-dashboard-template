import { auth } from "@/lib/auth/auth";

export default async function ProfileButton() {
	// Get the user's session
	const session = await auth();

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
