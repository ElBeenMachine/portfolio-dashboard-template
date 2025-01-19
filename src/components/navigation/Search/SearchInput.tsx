"use client";

import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchInput({
	setResults,
	searchRef,
}: {
	setResults: Function;
	searchRef: React.RefObject<HTMLInputElement>;
}) {
	const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

	// Search function
	function search() {
		const query = searchRef.current?.value;
		if (!query) return setResults([]);

		// Search logic here
		fetch(`/api/search?q=${query}`)
			.then((res) => res.json())
			.then((data) => {
				setResults(data);
			});
	}

	// Search on delay
	function handleInputChange() {
		if (typingTimeout) {
			clearTimeout(typingTimeout);
		}

		const timeout = setTimeout(() => {
			search();
		}, 500);

		setTypingTimeout(timeout);
	}

	// If the user is not currently in an input field, pressing '/' will focus the search input
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "/") {
				// If the current active element is an input or textarea, do nothing
				if (
					document.activeElement?.tagName === "INPUT" ||
					document.activeElement?.tagName === "TEXTAREA"
				)
					return;

				// Otherwise focus the search input
				e.preventDefault();
				document.getElementById("search")?.focus();
			}

			// If the escape key is pressed while the search bar is focused, clear the search bar and unfocus
			if (e.key === "Escape") {
				if (document.activeElement?.id !== "search") return;

				e.preventDefault();
				document.getElementById("search")?.blur();
				if (searchRef.current) searchRef.current.value = "";
				setResults([]);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	// If the user clicks outside the search bar, clear the search bar and unfocus
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (e.target instanceof HTMLElement && !e.target.closest("#global-search-input")) {
				if (searchRef.current) searchRef.current.value = "";
				setResults([]);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	return (
		<div
			id="global-search-input"
			className="flex items-center text-gray-400 rounded-lg focus-within:bg-gray-200 focus-within:text-gray-500 w-full"
		>
			<FaMagnifyingGlass className="ml-4" />
			<input
				id="search"
				ref={searchRef}
				onChange={handleInputChange}
				className="rounded-lg w-full px-4 py-2 bg-[#F0F0F0] focus:bg-gray-200 focus:placeholder:text-gray-500 placeholder:text-gray-400 outline-none focus:outline-none h-full"
				placeholder="Press ' / ' to Search..."
			/>
		</div>
	);
}
