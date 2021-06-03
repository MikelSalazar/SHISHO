import { Ontology } from "../model/Ontology";


/** Defines an exporter to JSON Schemas. */
export class JsonSchemaExporter {

	/** Exports the data of an ontology as a JSON schema.
	 * @param ontology The ontology to export.
	 * @return The JSON Schema with the ontology data. */
	static export(ontology:Ontology): string {
		
		// Create the basic elements of the JSON schema
		let schema = { 
			"$id": "https://example.com/example.schema.json",
			"$schema": "http://json-schema.org/draft-07/schema#",
			properties: {}
		}
		
		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
			let p:any = schema.properties[c.name] = {};
			p.type = "object";
			p.description = c.description;
		}

		let data = JSON.stringify(schema, null, "  ");
		
		// Create a false link to download the data
		let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
		let url = window.URL.createObjectURL(blob);
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style.display = "none";
		link.href = url;
		link.download = "schema.json";
		link.click();
		setTimeout(function () {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}, 0);

		// Return the JSON Schema
		return data;
	}
}
