import { Node } from "../Node.js";

/** Defines a bi-dimensional Vector. */
export class Vector extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (Array.isArray(data))
			this.set(data[0], data[1]);
		else
			this.set(data.x, data.y);
	}


	/** Sets the values of the vector.
	 * @param x The value of the vector in the X axis.
	 * @param y The value of the vector in the Y axis. */
	set(x = 0, y = 0) { this.x = x; this.y = y; }
}

