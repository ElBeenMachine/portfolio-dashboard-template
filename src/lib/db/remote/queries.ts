import { createDBConnection } from ".";

export const getAllProjects = async () => {
	// Get the client and instance ID
	const { client, instanceID } = await createDBConnection();

	try {
		const db = client.db(instanceID);
		const collection = db.collection("projects");

		const projects = await collection.find().toArray();
		return { projects };
	} catch (error) {
		console.error(error);
	} finally {
		// Close the client connection
		await client.close();
	}
};
