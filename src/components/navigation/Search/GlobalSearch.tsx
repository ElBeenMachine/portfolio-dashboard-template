"use client";

import { useRef, useState } from "react";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default function GlobalSearch() {
	const [results, setResults] = useState<any[]>([]);
	const searchRef = useRef<HTMLInputElement>(null);

	return (
		<div className="relative hidden lg:block w-full max-w-md xl:max-w-2xl">
			<SearchInput searchRef={searchRef} setResults={setResults} />
			<SearchResults searchRef={searchRef} results={results} setResults={setResults} />
		</div>
	);
}
