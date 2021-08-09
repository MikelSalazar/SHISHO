import { Node } from "../Node.js";
import { String } from "../types/String.js";


/** Defines a Property of a Class. */
export class Property extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param parentClass The class the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, parentClass, data) {

		// Call the base class constructor
		super("property", nodeName, parentClass, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);

		// Deserialize the initialization data
		if (data)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Property. */
	get name() { return this._name; }

	/** The description of the Property. */
	get description() { return this._description; }
}
