/**
 * @author Ollie Beenham
 */
"use client";

import { useEffect, useRef } from "react";
import { StringInput } from "./inputs";

/**
 * Settings section
 * 
 * @param {string} title The title of the settings section
 * @returns {JSX.Element} The settings section
 */
function SettingsSection({ title, children } : { title: string, children: JSX.Element[] }) {
    return (
        <section>
            <h2 className="text-2xl font-medium">{title}</h2>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </section>
    );
}

/**
 * Settings page
 * 
 * @returns {JSX.Element} Settings page
 */
export default function SettingsPage() {
    const mongoRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);

    /**
     * Update general settings
     */
    function updateGeneralSettings() {
        // Update the title
        fetch("/api/config/title/update", {
            method: "POST",
            body: JSON.stringify({ title: titleRef.current?.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Update the MongoDB URI
        fetch("/api/config/database/update", {
            method: "POST",
            body: JSON.stringify({ uri: mongoRef.current?.value }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // Load in the default settings
    useEffect(() => {
        // Create an API fetch request
        fetch("/api/config/all").then(res => res.json()).then(data => {
            const settings = data.settings;

            // Set the MongoDB connection string
            if (mongoRef.current) {
                mongoRef.current.value = settings.find((setting: { key: string }) => setting.key === "mongodb-connection-string")?.value || "";
            }

            // Set the title
            if (titleRef.current) {
                titleRef.current.value = settings.find((setting: { key: string }) => setting.key === "title")?.value || "";
            }
        });
    }, [])

    return (
        <main>
            <h1 className="text-3xl text-semibold mb-5">Settings</h1>
            <SettingsSection title="General">
                <div className="flex flex-col gap-1">
                    <label>Enter Your MongoDB Connection String</label>
                    {mongoRef.current && mongoRef.current?.value.length == 0 && <span className="text-[#FF0000]">This is required for the dashboard to function</span>}
                    <StringInput ref={mongoRef} placeholder="mongodb://localhost:27017/my-dashboard" name={"mongodb-connection-string"} />
                </div>

                <div className="flex flex-col gap-1">
                    <label>Enter Your Dashboard Title</label>
                    <StringInput ref={titleRef} placeholder="My Dashboard" name={"title"} />
                </div>

                <button className="bg-gray-800 hover:bg-gray-600 transition-all w-max text-white px-5 py-3 rounded-md" onClick={updateGeneralSettings}>Update</button>
            </SettingsSection>
        </main>
    );
}