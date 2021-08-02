import { Root } from "../model/Root";

/** Manages the importation of ontologies from JSON files. */
export class JsonImporter {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Imports the data from a JSON file
	 * @param root The root of the SHISHO data model.
	 * @param data The JSON file data.
	 * @param combine Whether to combine (default) or append the new data). */
	static import(root:Root, data: string, combine = true) {

		// Parse the Json data
		let jsonData = JSON.parse(data);

		// deserialize the JSON data
		root.deserialize(jsonData, combine);
	}
}