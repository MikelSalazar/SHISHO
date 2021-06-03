

/** Defines an exporter to OWL format. */
export class OwlExporter {

	/** Exports the data of an ontology as a OWL.
	 * @param ontology The ontology to export.
	 * @return The OWL with the ontology data. */
	static export(ontology) {

		// Create the basic elements of the OWL 
		let owl = "";

		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
		}

		// Return the JSON Schema
		return owl;
	}
}

