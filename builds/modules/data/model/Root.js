import { Node } from "../Node.js";
import { NodeSet } from "../NodeSet.js";
import { String } from "../types/String.js";
import { Ontology } from "./Ontology.js";
import { Style } from "./Style.js";

/** Defines the Root of a SHISHO knowledge base. */
export class Root extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Root instance.
	 * @param data The initialization data. */
	constructor(data) {
		// Call the base class constructor
		super("root", null, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._author = new String("author", this);
		this._ontology = new Ontology("ontology", this);
		this._styles = new NodeSet("styles", this, Style);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Root. */
	get name() { return this._name; }

	/** The description of the Root. */
	get description() { return this._description; }

	/** The author of the Root. */
	get author() { return this._author; }

	/** The ontology of the Root. */
	get ontology() { return this._ontology; }

	/** The styles of the Root. */
	get styles() { return this._styles; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Root instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Knowledge base without name.");
		if (data.description)
			this._description.deserialize(data.description);
		if (data.ontology)
			this._ontology.deserialize(data.ontology, combine);
		if (data.styles)
			this.styles.deserialize(data.ontology, combine);
	}
}
