import { Node } from "../Node.js";
import { Ontology } from "./Ontology.js";

/** Defines the Root of a SHISHO data model. */
export class Root extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The graphical styles. */
		this.styles = {};
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data = {}) {
		this.name = data.name;
		this.description = data.description;
		this.author = data.author;
		this.ontology = new Ontology(data.ontology);
	}
}
