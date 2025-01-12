import {
	checkGitHub,
	checkGoogle,
	checkMicrosoftEntraId,
	checkOkta,
} from "@/lib/auth/validateOAuth";

export default async function IdentityProviders({ redirect }: { redirect: string }) {
	// Check entra ID vars
	const isMicrosoftEnabled = await checkMicrosoftEntraId();
	const isGoogleEnabled = await checkGoogle();
	const isOktaEnabled = await checkOkta();
	const isGitHubEnabled = await checkGitHub();

	// Count the identity providers that are enabled
	const providerCount = [
		isMicrosoftEnabled,
		isGoogleEnabled,
		isOktaEnabled,
		isGitHubEnabled,
	].filter((enabled) => enabled).length;

	// Define grid columns
	const gridCols = providerCount > 1 ? 2 : 1;

	// If there are no enabled providers, return null
	if (providerCount === 0) return null;

	return (
		<div className="w-full">
			<p className="mb-2 text-gray-400">Or sign in with an identity provider</p>
			<div className={`w-full grid grid-cols-1 md:grid-cols-${gridCols} gap-5`}>
				{/* Microsoft OAuth Button */}
				{isMicrosoftEnabled && (
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
				)}

				{/* Google OAuth Button */}
				{isGoogleEnabled && (
					<a
						href={`/api/auth/signin?provider=google&redirectTo=${redirect}`}
						className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
					>
						<img src={"/img/providers/google.webp"} alt="Google Logo" className="w-8" />
						Google
					</a>
				)}

				{/* GitHub OAuth Button */}
				{isGitHubEnabled && (
					<a
						href={`/api/auth/signin?provider=github&redirectTo=${redirect}`}
						className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
					>
						<img
							src={"/img/providers/github.webp"}
							alt="GitHub Logo"
							className="w-8 rounded-full"
						/>
						GitHub
					</a>
				)}

				{/* Okta OAuth Button */}
				{isOktaEnabled && (
					<a
						href={`/api/auth/signin?provider=okta&redirectTo=${redirect}`}
						className="flex w-full justify-start gap-5 items-center rounded-md bg-gray-100 p-4 hover:bg-gray-200 transition-all"
					>
						<img
							src={"/img/providers/okta.webp"}
							alt="Okta Logo"
							className="w-8 rounded-full"
						/>
						Okta
					</a>
				)}
			</div>
		</div>
	);
}
