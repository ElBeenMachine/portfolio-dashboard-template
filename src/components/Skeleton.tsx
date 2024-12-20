/**
 * @author Ollie Beenham
 */

/**
 * A template object for skeletons to use throughout the application
 *
 * @param {string} className Extra classes to add to the skeleton
 * @returns
 */
export default function Skeleton({ className }: { className?: string }) {
	return <div className={`bg-slate-200 motion-safe:animate-pulse ${className}`} />;
}
