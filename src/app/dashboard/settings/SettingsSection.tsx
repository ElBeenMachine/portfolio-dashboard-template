/**
 * @author Ollie Beenham
 */

/**
 * Settings section
 * 
 * @param {string} title The title of the settings section
 * @returns {JSX.Element} The settings section
 */
export default function SettingsSection({ title, children } : { title: string, children: JSX.Element[] }) {
    return (
        <section>
            <h2 className="text-2xl font-medium">{title}</h2>
            <div className="flex flex-col gap-3">
                {children}
            </div>
        </section>
    );
}