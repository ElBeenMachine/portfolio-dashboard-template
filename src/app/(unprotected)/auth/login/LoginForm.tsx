import { signIn } from "@/lib/auth";
import { useRef } from "react";

export default function LoginForm({ redirect }: { redirect: string }) {
	return (
		<form
			action={async () => {
				"use server";
				signIn("local");
			}}
			className="w-full flex flex-col gap-5"
		>
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
				className="w-full p-2 mt-2 bg-gray-600 text-white rounded-md transition-all hover:bg-gray-800"
			>
				Login
			</button>
		</form>
	);
}
