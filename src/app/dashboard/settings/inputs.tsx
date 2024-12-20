/**
 * @author Ollie Beenham
 */

import { RefObject } from "react";

/**
 * String input
 * 
 * @param {string} placeholder The placeolder text for the input
 * @param {string} name The name of the input
 * @param {any} ref The reference for the input
 * @returns 
 */
export function StringInput({ placeholder, name, ref } : { placeholder: string, name: string, ref: RefObject<HTMLInputElement> }) {
    return (
        <input className="border border-solid border-black/25 px-5 py-2 rounded-md focus:border-gray-800 outline-none" type="text" name={name} ref={ref} placeholder={placeholder} />
    ); 
}