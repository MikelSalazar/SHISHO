import { Shape } from "../Shape.js";


export class Rectangle extends Shape {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);
		this._radius = data.radius || 0;
	}
}
