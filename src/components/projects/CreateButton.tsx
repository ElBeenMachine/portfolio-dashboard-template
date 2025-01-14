/**
 * @author Ollie Beenham
 */
"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

export default function CreateButton() {
	const [isOpen, setIsOpen] = useState(false);
	const titleRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	function onSubmit() {
		return new Promise((resolve, reject) => {
			// Create the new project
			fetch("/api/projects/create", {
				method: "POST",
				body: JSON.stringify({ title: titleRef.current?.value, type: "code" }),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(async (response) => {
				if (!response.ok) {
					console.error("Failed to create project");
					reject("Failed to create project");
				}

				setIsOpen(false);
				router.refresh();
				resolve("Success");
			});
		});
	}

	return (
		<div className="w-full flex justify-end top-5 absolute right-5">
			<button
				className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
				onClick={() => setIsOpen(true)}
			>
				Create
			</button>

			<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Create a new Code Project">
				<div>
					<label htmlFor="title">Title</label>
					<input
						ref={titleRef}
						type="text"
						id="title"
						className="w-full border border-gray-300 rounded p-1"
					/>
					<div className="flex justify-end mt-4">
						<button
							className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
							onClick={() =>
								toast.promise(onSubmit(), {
									pending: "Creating project...",
									success: "Project created",
									error: "Failed to create project",
								})
							}
						>
							Create
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
