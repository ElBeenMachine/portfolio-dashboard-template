/**
 * @author Ollie Beenham
 */

"use client";

import { useEffect, useRef } from "react";
import SettingsSection from "./SettingsSection";
import { StringInput } from "./inputs";
import { toast } from "react-toastify";

export default function GeneralSettings() {
	const titleRef = useRef<HTMLInputElement>(null);
	const logoRef = useRef<HTMLInputElement>(null);
	const authBgRef = useRef<HTMLInputElement>(null);

	/**
	 * Update general settings
	 */
	function updateGeneralSettings() {
		return new Promise((resolve, reject) => {
			// Update the title
			fetch("/api/config/title", {
				method: "POST",
				body: JSON.stringify({ title: titleRef.current?.value }),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (!res.ok) {
					reject("Unable to save settings");
				}
			});

			// Update the logo
			fetch("/api/config/dashboard-logo", {
				method: "POST",
				body: JSON.stringify({ url: logoRef.current?.value }),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (!res.ok) {
					reject("Unable to save settings");
				}
			});

			// Update the authentication background
			fetch("/api/config/auth-background", {
				method: "POST",
				body: JSON.stringify({ url: authBgRef.current?.value }),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (!res.ok) {
					reject("Unable to save settings");
				}
			});

			resolve("Settings updated");
		});
	}

	// Load in the default settings
	useEffect(() => {
		// Create an API fetch request
		fetch("/api/config/all")
			.then((res) => res.json())
			.then((data) => {
				const settings: { [key: string]: string | boolean | number } = {};
				data.settings.forEach(
					(setting: { key: string; value: string | boolean | number }) => {
						settings[setting.key] = setting.value;
					}
				);

				// Set the title
				if (titleRef.current)
					titleRef.current.value = String(settings.dashboardTitle) || "";

				// Set the logo
				if (logoRef.current) logoRef.current.value = String(settings.dashboardLogo) || "";

				// Set the authentication background
				if (authBgRef.current)
					authBgRef.current.value = String(settings.authBackground) || "";
			});
	}, []);

	return (
		<SettingsSection title="General">
			{/* Dashboard Title */}
			<div className="flex flex-col gap-1">
				<label>Dashboard Title</label>
				<StringInput ref={titleRef} placeholder="My Dashboard" name={"title"} />
			</div>

			{/* Dashboard Logo */}
			<div className="flex flex-col gap-1">
				<label>Dashboard Logo</label>
				<StringInput
					ref={logoRef}
					placeholder="https://example.com/logo.png"
					name={"logo"}
				/>
			</div>

			{/* Authentication Background */}
			<div className="flex flex-col gap-1">
				<label>Authentication Background</label>
				<StringInput
					ref={authBgRef}
					placeholder="https://example.com/background.png"
					name={"auth-background"}
				/>
			</div>

			{/* Update button */}
			<button
				className="bg-gray-800 hover:bg-gray-600 transition-all w-max text-white px-5 py-3 rounded-lg"
				onClick={() =>
					toast.promise(updateGeneralSettings(), {
						pending: "Updating settings...",
						success: "Settings updated",
						error: "Failed to update settings",
					})
				}
			>
				Update
			</button>
		</SettingsSection>
	);
}
