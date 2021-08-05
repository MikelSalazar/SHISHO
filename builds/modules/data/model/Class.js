import { Node } from "../Node.js";
import { Property } from "./Property.js";
import { Vector } from "../types/Vector.js";
import { String } from "../types/String.js";
import { NodeSet } from "../NodeSet.js";

/** Defines a Class of an Ontology. */
export class Class extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param ontology The Ontology the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, ontology, data) {

		// Call the base class constructor
		super(nodeName || "class", ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._properties = new NodeSet("properties", this, Property);
		this._positions = new NodeSet("positions", this, Vector);

		// Deserialize the initialization data
		if (data != undefined)
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


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Class instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Class without name.");
		if (data.description)
			this._description.deserialize(data.description);
		if (data.properties)
			this._properties.deserialize(data.properties);
		if (data.positions)
			this._positions.deserialize(data.positions);
	}
}
