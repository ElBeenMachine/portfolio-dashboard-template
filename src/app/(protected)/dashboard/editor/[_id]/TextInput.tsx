import { RefObject } from "react";

export default function TextInput({
	id,
	placeholder,
	ref,
}: {
	id: string;
	placeholder?: string;
	ref: RefObject<HTMLInputElement>;
}) {
	return (
		<input
			id={id}
			type="text"
			className="w-full rounded-md border border-gray-300 p-2"
			placeholder={placeholder}
			ref={ref}
		/>
	);
}
