import { Ontology } from "../model/Ontology";


/** Defines an exporter to SQL format. */
export class SqlExporter {

	/** Exports the data of an ontology as SQL format.
	 * @param ontology The ontology to export.
	 * @return The SQL code with the ontology data. */
	static export(ontology:Ontology) {
		
		// Create the basic elements of the SQL code
		let sql = ""
		
		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
		}

		// Return the SQL code
		return sql;
	}
}
