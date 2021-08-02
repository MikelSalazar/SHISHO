import { Node } from "../Node.js";

/** Defines a Property of a Class. */
export class Property extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param data The initialization data. */
	constructor(data = null) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Property instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (!data.name)
			throw Error("Property without name");
		this.name = data.name;
		this.description = data.description;
	}
}
