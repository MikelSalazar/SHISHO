import { Node } from "../Node.js";

/** Defines a Relation between two Class instances. */
export class Relation extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Relation instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Relation without name");
		this.name = data.name;
		this.description = data.description;
		this.origin = data.origin;
		this.target = data.target;
	}
}
