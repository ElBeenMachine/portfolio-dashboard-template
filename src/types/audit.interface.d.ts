export default interface Audit {
	_id?: ObjectId;
	name: string;
	action: string;
	project?: ObjectId;
	setting?: string[];
	timestamp?: Date;
}
