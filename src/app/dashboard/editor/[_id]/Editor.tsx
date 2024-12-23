/**
 * @author Ollie Beenham
 */

"use client";

import MDEditor, { commands } from "@uiw/react-md-editor";
import InputHeading from "./InputHeading";
import TextInput from "./TextInput";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Project from "@/types/Project";

export default function ProjectForm({ project }: { project: Project }) {
	// Destructure the project object
	const { name, description, thumbnail, body, status, link } = project;

	// Define the router
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	// Define the refs
	const nameRef = useRef<HTMLInputElement>(null);
	const descriptionRef = useRef<HTMLInputElement>(null);
	const thumbnailRef = useRef<HTMLInputElement>(null);
	const [editorBody, setBody] = useState<string>("");
	const statusRef = useRef<HTMLSelectElement>(null);
	const linkRef = useRef<HTMLInputElement>(null);

	// Populate the editor fields with the project data
	useEffect(() => {
		if (nameRef.current) nameRef.current.value = name || "";
		if (descriptionRef.current) descriptionRef.current.value = description || "";
		if (thumbnailRef.current) thumbnailRef.current.value = thumbnail || "";
		if (body) setBody(body);
		if (statusRef.current) statusRef.current.value = status || "Draft";
		if (linkRef.current) linkRef.current.value = link || "";

		return () => {
			// Cleanup
			setBody("");
		};
	}, [body, description, link, name, status, thumbnail]);

	// Create modal

	function handleSave() {
		// Define the body
		const body = {
			_id: project._id,
			project: {
				name: nameRef.current?.value,
				description: descriptionRef.current?.value,
				thumbnail: thumbnailRef.current?.value,
				body: editorBody,
				status: statusRef.current?.value,
				link: linkRef.current?.value,
			},
		};

		// Create the new project
		fetch("/api/projects/update", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (response) => {
			if (!response.ok) {
				console.error("Failed to update project");
				return;
			}

			setIsOpen(false);
			router.refresh();
		});
	}

	function handleDelete() {
		// Define the body
		const body = {
			_id: project._id,
		};

		// Delete the project
		fetch("/api/projects/delete", {
			method: "DELETE",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json",
			},
		}).then(async (response) => {
			if (!response.ok) {
				console.error("Failed to delete project");
				return;
			}

			setIsOpen(false);
			router.push("/dashboard");
		});
	}

	return (
		<div>
			<div>
				<InputHeading htmlFor="name">Project Name</InputHeading>
				<TextInput id="name" ref={nameRef} placeholder="My Super Awesome Project!" />
			</div>
			<div className="mt-4">
				<InputHeading htmlFor="description">Summary</InputHeading>
				<TextInput
					id="description"
					ref={descriptionRef}
					placeholder="A brief summary of the project"
				/>
			</div>
			<div className="mt-4">
				<InputHeading htmlFor="thumbnail">Thumbnail</InputHeading>
				<TextInput
					id="thumbnail"
					ref={thumbnailRef}
					placeholder="https://example.com/image.jpg"
				/>
			</div>
			<div className="mt-4">
				<InputHeading htmlFor="link">Website Link</InputHeading>
				<TextInput id="link" ref={linkRef} placeholder="https://example.com" />
			</div>

			<div className="mt-4" data-color-mode="light">
				<InputHeading htmlFor="body">Body</InputHeading>
				<MDEditor
					textareaProps={{
						placeholder: "Write your project description here...",
					}}
					value={editorBody}
					onChange={(val) => setBody(val || "")}
					commands={[
						commands.bold,
						commands.italic,
						commands.strikethrough,
						commands.link,
						commands.image,
						commands.quote,
						commands.table,
						commands.divider,
						commands.code,
						commands.codeBlock,
						commands.divider,
						commands.checkedListCommand,
						commands.unorderedListCommand,
						commands.orderedListCommand,
						commands.divider,
						commands.title1,
						commands.title2,
						commands.title3,
						commands.title4,
						commands.title5,
						commands.title6,
					]}
					color="#000"
					fullscreen={false}
				/>
			</div>
			<div className="mt-4">
				<InputHeading htmlFor="status">Status</InputHeading>
				<select
					id="status"
					className="w-full md:w-auto rounded-md border border-gray-300 p-2"
					ref={statusRef}
				>
					<option value="draft">Draft</option>
					<option value="live">Live</option>
					<option value="archived">Archived</option>
				</select>
			</div>
			<div className="mt-4 flex gap-2">
				<button
					id={"documentSaveButton"}
					className="bg-gray-800 hover:bg-gray-500 transition-all text-white px-4 py-2 rounded-md hover:bg-gray-600transition-all"
					onClick={handleSave}
				>
					Save
				</button>
				<button
					id={"documentDeleteButton"}
					className="bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80 transition-all"
					onClick={() => setIsOpen(true)}
				>
					Delete
				</button>
			</div>

			<Modal open={isOpen} onClose={() => setIsOpen(false)} title="Are you sure?">
				<div>
					<p>
						This action is irreversible. Consider changing the project's status to
						"Archived" instead.
					</p>
					<div className="flex justify-end mt-4">
						<button
							className="bg-gray-800 hover:bg-gray-500 transition-all text-white font-bold py-2 px-4 rounded mr-2"
							onClick={() => setIsOpen(false)}
						>
							Cancel
						</button>
						<button
							className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
							onClick={handleDelete}
						>
							I'm Sure
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
