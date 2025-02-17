/**
 * @author Ollie Beenham
 */

import { Metadata } from "next";

/**
 * Export the metadata for the page
 */
export const metadata: Metadata = {
	title: "Blog Posts",
};

/**
 * Blog posts page
 *
 * @returns {JSX.Element} Blog posts page
 */
export default function BlogPosts() {
	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Blog Posts</h1>
			<p>Welcome to the blog posts page!</p>
		</main>
	);
}
