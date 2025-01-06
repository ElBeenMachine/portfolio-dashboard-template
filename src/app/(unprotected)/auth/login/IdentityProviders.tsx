"use client";

export default function IdentityProviders({ redirect }: { redirect: string }) {
	return (
		<div className="w-full">
			<p className="mb-2 text-gray-400">Or sign in with an identity provider</p>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
				{/* Microsoft OAuth Button */}
				<a
					href={`/api/auth/signin?provider=microsoft-entra-id&redirectTo=${redirect}`}
					className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
				>
					<img
						src={"/img/providers/microsoft.webp"}
						alt="Microsoft Logo"
						className="w-8"
					/>
					Microsoft
				</a>

				{/* Google OAuth Button */}
				<a
					href={`/api/auth/signin?provider=google&redirectTo=${redirect}`}
					className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
				>
					<img src={"/img/providers/google.webp"} alt="Google Logo" className="w-8" />
					Google
				</a>

				{/* Okta OAuth Button */}
				<a
					href={`/api/auth/signin?provider=google&redirectTo=${redirect}`}
					className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
				>
					<img
						src={"/img/providers/okta.webp"}
						alt="Okta Logo"
						className="w-8 rounded-full"
					/>
					Okta
				</a>
			</div>
		</div>
	);
}
