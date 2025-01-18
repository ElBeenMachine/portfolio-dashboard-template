import { ObjectId } from "mongodb";

/**
 * Project interface
 */
export default interface Project {
	_id: ObjectId;
	name: string;
	thumbnail: string;
	description?: string;
	status: "live" | "draft";
	body?: string;
	type: "code" | "literature" | "blog";
	link?: string;
	createdAt: Date;
	updatedAt: Date;
}
