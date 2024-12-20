/**
 * @author Ollie Beenham
 */

import "@/styles/default.css";
import { PublicEnvScript } from "next-runtime-env";

/**
 * Root layout for the authentication pages of the application.
 *
 * @param {React.ReactNode} children Child elements
 * @returns Document layout
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <PublicEnvScript />
            </head>
            <body id="auth-body" className="antialiased text-white">
                <div className="w-full h-dvh flex items-center justify-center flex-col bg-black/30">
                    {children}
                </div>
            </body>
        </html>
    );
}