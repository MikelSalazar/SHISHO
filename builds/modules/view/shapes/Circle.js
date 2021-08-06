import { Shape } from "../Shape.js";

/** Defines a Circle Shape. */
export class Circle extends Shape {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Circle instance.
	 * @param data The initialization data. */
	constructor(data = {}) {

		// Call the base class constructor
		super(data);

		// Process the initialization data
		this._radius = data.radius || 0;

		// Update the shape
		this.update();
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The radius of the Circle. */
	get radius() { return this._radius; }

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the shape */
	update() {
		this._path = new Path2D();
		this._path.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
	}
}
