"use client";

import { signIn } from "next-auth/react";

export default function LoginForm({ redirect }: { redirect: string }) {
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.target as HTMLFormElement;
		const username = (form.elements.namedItem("username") as HTMLInputElement).value;
		const password = (form.elements.namedItem("password") as HTMLInputElement).value;

		await signIn("credentials", {
			redirect: true,
			redirectTo: redirect,
			username,
			password,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
			<input
				type="text"
				name="username"
				placeholder="Username"
				className="w-full p-2 mt-2 border-b border-solid border-gray-800 outline-none focus:border-gray-300 transition-all"
			/>
			<input
				type="password"
				name="password"
				placeholder="Password"
				className="w-full p-2 mt-2 border-b border-solid border-gray-800 outline-none focus:border-gray-300 transition-all"
			/>
			<button
				type="submit"
				className="w-full p-2 mt-2 bg-gray-600 text-white rounded-lg transition-all hover:bg-gray-800"
			>
				Login
			</button>
		</form>
	);
}
