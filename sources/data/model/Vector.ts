import { Node } from "../Node";

/** Defines a bi-dimensional Vector. */
export class Vector extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The value of the vector in the X axis. */
	public x: number;

	/** The value of the vector in the Y axis. */
	public y: number;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) { this.set(data.x, data.y); }


	/** Sets the values of the vector.
	 * @param x The value of the vector in the X axis.
	 * @param y The value of the vector in the Y axis. */
	set(x: number = 0, y: number = 0) { this.x = x; this.y = y; }
}
