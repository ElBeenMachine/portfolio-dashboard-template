import { auth, signOut } from "@/lib/auth";

export default async function DashboardHome() {
	const session = await auth();

	return (
		<main>
			<h1>Dashboard</h1>
			<p>
				Welcome to the dashboard, {session?.user?.name?.split(" ")[0]}!
				This is a protected page that can only be accessed by
				authenticated users.
			</p>

			{session && (
				<form
					action={async () => {
						"use server";
						await signOut({ redirectTo: "/", redirect: true });
					}}>
					<button type="submit">Sign out</button>
				</form>
			)}
		</main>
	);
}
