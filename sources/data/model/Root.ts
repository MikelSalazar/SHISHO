import { Node } from "../Node";
import { Ontology } from "./Ontology";
import { Style } from "./Style";

/** Defines the Root of a SHISHO data model. */
export class Root extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name/title of the SHISHO knowledge base. */
	name: string;

	/** The description of the SHISHO knowledge base. */
	description: string;

	/** The author(s) of the SHISHO knowledge base. */
	author: string;

	/** The ontology data. */
	ontology: Ontology = new Ontology();

	/** The graphical styles. */
	styles: Record<string, Style> = {};

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data: any = null) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Root instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {

		// Check if we have to clean the data (when not combining)
		if (!this.name || !combine) this.name = data.name || "Untitled"; 
		if (!this.description || !combine)	this.description = data.description;
		if (!combine) this.ontology = new Ontology(); this.styles = {};

		// Deserialize the ontology data
		if (data.ontology) this.ontology.deserialize(data.ontology, combine);

		// Deserialize the graphical styles
		if (data.styles) data.styles.forEach(styleData => {
			let styleName = styleData.name;
			if (!styleName) throw Error ("Style without name.");
			if (!this.styles[styleName]) this.styles[styleName] = new Style();
			this.styles[styleName].deserialize(styleData, combine);
		});

		// If the name is null or undefined, give it a valid value
		if (!this.name) this.name = "Untitled Document";
	}
}