import { Shape } from "../Shape.js";

/** Defines a (rounded) Rectangle Shape. */
export class Rectangle extends Shape {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Rectangle instance.
	 * @param data The initialization data. */
	constructor(data = {}) {

		// Call the base class constructor
		super(data);

		// Process the initialization data
		this._radius = data.radius || 0;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The radius of the Rectangle. */
	get radius() { return this._radius; }
}
