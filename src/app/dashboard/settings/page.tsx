/**
 * @author Ollie Beenham
 */

import { Metadata } from "next";
import GeneralSettings from "./GeneralSettings";

/**
 * Export the metadata for the page
 */
export const metadata: Metadata = {
	title: "Settings",
};

/**
 * Settings page
 *
 * @returns {JSX.Element} Settings page
 */
export default function SettingsPage() {
	return (
		<main>
			<h1 className="text-3xl text-semibold mb-5">Settings</h1>
			<GeneralSettings />
		</main>
	);
}
