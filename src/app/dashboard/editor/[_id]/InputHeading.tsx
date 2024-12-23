export default function InputHeading({
	children,
	htmlFor,
}: {
	children: string;
	htmlFor: string;
}) {
	return (
		<label
			htmlFor={htmlFor}
			className="block text-gray-500 mb-1 font-medium text-sm">
			{children}
		</label>
	);
}
