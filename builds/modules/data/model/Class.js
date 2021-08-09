import { Node } from "../Node.js";
import { NodeSet } from "../NodeSet.js";
import { Property } from "./Property.js";
import { String } from "../types/String.js";
import { Vector } from "../types/complex/Vector.js";

/** Defines a Class of an Ontology. */
export class Class extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param ontology The Ontology the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, ontology, data) {

		// Call the base class constructor
		super("class", nodeName, ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._properties = new NodeSet("properties", this, Property);
		this._positions = new NodeSet("positions", this, Vector);

		// Deserialize the initialization data
		if (data)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Class. */
	get name() { return this._name; }

	/** The description of the Class. */
	get description() { return this._description; }

	/** The properties of the Class. */
	get properties() { return this._properties; }

	/** The positions of the Class in the different Graph views. */
	get positions() { return this._positions; }
}
