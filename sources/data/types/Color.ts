import { Node } from "../Node";

/** Defines a RGB Color. */
export class Color extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The value of the Red component color. */
	public r: number;

	/** The value of the Green component color. */
	public g: number;

	/** The value of the Blue component color. */
	public b: number;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) { this.set(data.r, data.g, data.b); }

	/** Sets the values of the color.
	 * @param r The value of the Red component color
	 * @param g The value of the Green component color.
	 * @param b The value of the Blue component color. */
	set(r: number = 0, g: number = 0, b: number = 0) {
		this.r = r; this.g = g; this.b = b;
	}
}
