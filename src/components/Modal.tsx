/**
 * @author Ollie Beenham
 */

import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * A generic modal component
 *
 * @param {ReactNode} children The children to display in the modal
 * @param {boolean} open Whether the modal is open
 * @param {void} onClose The function to call when the modal is closed
 * @returns The modal component
 */
export default function Modal({
	children,
	open,
	onClose,
	title,
}: {
	children: ReactNode;
	open: boolean;
	onClose: () => void;
	title?: string;
}) {
	return (
		open && (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
				<div className="modal-content bg-white p-4 rounded-lg min-w-[300px]">
					<div id="modal-header" className="flex justify-between items-center mb-5">
						<h2 className="text-xl mr-16">{title || "Modal"}</h2>
						<button
							onClick={() => onClose()}
							className="mr-1 hover:opacity-70 transition-all"
						>
							<FaTimes size={20} />
						</button>
					</div>
					<div id="modal-body">{children}</div>
				</div>
			</div>
		)
	);
}
