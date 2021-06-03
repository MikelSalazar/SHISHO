import { Node } from "../Node.js";

/** Defines a Property of a Class. */
export class Property extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Property without name");
		this.name = data.name;
		this.description = data.description;
	}
}
