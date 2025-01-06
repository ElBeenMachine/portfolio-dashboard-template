"use client";

import { signIn } from "@/lib/auth";
import { useRef } from "react";

export default function LoginForm({ redirect }: { redirect: string }) {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	function localLogin() {
		signIn("local", {
			username: usernameRef.current?.value,
			password: passwordRef.current?.value,
			redirectTo: redirect,
			redirect: true,
		});
	}

	return (
		<div className="w-full flex flex-col gap-5">
			<input
				type="text"
				placeholder="Username"
				ref={usernameRef}
				className="w-full p-2 mt-2 border-b border-solid border-gray-800 outline-none focus:border-gray-300 transition-all"
			/>
			<input
				type="password"
				placeholder="Password"
				ref={passwordRef}
				className="w-full p-2 mt-2 border-b border-solid border-gray-800 outline-none focus:border-gray-300 transition-all"
			/>
			<button
				onClick={localLogin}
				className="w-full p-2 mt-2 bg-gray-600 text-white rounded-md transition-all hover:bg-gray-800"
			>
				Login
			</button>
		</div>
	);
}
