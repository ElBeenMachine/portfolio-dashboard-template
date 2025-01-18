import { RefObject } from "react";

export default function TextInput({
	id,
	placeholder,
	ref,
	onChange,
}: {
	id: string;
	placeholder?: string;
	ref: RefObject<HTMLInputElement>;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	return (
		<input
			id={id}
			type="text"
			className="w-full rounded-lg border border-gray-300 p-2"
			placeholder={placeholder}
			ref={ref}
			onChange={onChange}
		/>
	);
}
