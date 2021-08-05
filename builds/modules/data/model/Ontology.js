import { Node } from "../Node.js";
import { NodeSet } from "../NodeSet.js";
import { Class } from "./Class.js";
import { Relation } from "./Relation.js";

/** Defines an Ontology. */
export class Ontology extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Ontology instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName, root, data) {

		// Call the base class constructor
		super(nodeName || "ontology", root, data);

		// Initialize the child nodes
		this._classes = new NodeSet("classes", this, Class);
		this._relations = new NodeSet("relation", this, Relation);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The classes of the ontology. */
	get classes() { return this._classes; }

	/** The relations of the ontology. */
	get relations() { return this._relations; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Ontology instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (data.classes)
			this._classes.deserialize(data.classes);
		if (data.relations)
			this._relations.deserialize(data.relations);
		1;
	}
}
