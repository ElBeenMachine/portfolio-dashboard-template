import { capitalise } from "@/lib/StringOperations";
import Link from "next/link";

export default function searchResults({
	searchRef,
	results,
	setResults,
}: {
	searchRef: React.RefObject<HTMLInputElement>;
	results: any[];
	setResults: React.Dispatch<React.SetStateAction<any[]>>;
}) {
	return (
		<div
			className="fixed top-16 bg-white rounded-lg shadow-lg max-w-2xl overflow-hidden"
			style={{ width: "inherit", maxWidth: "inherit" }}
		>
			{results.map((result) => (
				<Link
					href={`/dashboard/editor/${result._id}`}
					key={result._id}
					onClick={() => {
						if (searchRef.current) searchRef.current.value = "";
						setResults([]);
					}}
					className="flex items-center p-4 hover:bg-gray-200 transition-all"
				>
					<img
						src={result.thumbnail}
						alt={result.name}
						className="w-12 h-12 rounded-full object-cover object-center"
					/>
					<div className="ml-4">
						<h3 className="font-semibold">{result.name}</h3>
						<p className="text-gray-500">{capitalise(result.type)} Project</p>
						{result.description && (
							<p>
								{result.description.length > 100
									? `${result.description.substring(0, 100)}...`
									: result.description}
							</p>
						)}
					</div>
				</Link>
			))}
		</div>
	);
}
