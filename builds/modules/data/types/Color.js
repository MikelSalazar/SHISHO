import { Node } from "../Node.js";

/** Defines a RGB Color. */
export class Color extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) { this.set(data.r, data.g, data.b); }

	/** Sets the values of the color.
	 * @param r The value of the Red component color
	 * @param g The value of the Green component color.
	 * @param b The value of the Blue component color. */
	set(r = 0, g = 0, b = 0) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
}

