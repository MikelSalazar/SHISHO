import { Ontology } from "../model/Ontology";


/** Defines an exporter to JSON Files. */
export class JsonExporter {

	/** Exports the data of an ontology as a JSON file.
	 * @param ontology The ontology to export.
	 * @return The JSON file with the ontology data. */
	static export(ontology:Ontology): string {
		
		// Simply use JSON.stringify to convert to JSON
		let data = ontology.serialize();
		
		// Create a false link to download the data
		let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
		let url = window.URL.createObjectURL(blob);
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style.display = "none";
		link.href = url;
		link.download = "file.json";
		link.click();
		setTimeout(function () {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}, 0);

		// Return the JSON Schema
		return data;
	}
}


