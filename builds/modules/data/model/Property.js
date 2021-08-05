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
		super(nodeName || "property", parentClass, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Property. */
	get name() { return this._name; }

	/** The description of the Property. */
	get description() { return this._description; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Property instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Property without name.");
		if (data.description)
			this._description.deserialize(data.description);
	}
}
