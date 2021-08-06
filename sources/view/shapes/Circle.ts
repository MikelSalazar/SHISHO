import { Shape } from "../Shape";

/** Defines a Circle Shape. */
export class Circle extends Shape {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The radius of the Circle. */
	private _radius: number;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The radius of the Circle. */
	get radius(): number { return this._radius; }
	
	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Circle instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) {
		
		// Call the base class constructor
		super(data);

		// Process the initialization data
		this._radius = data.radius || 0;

		// Update the shape
		this.update();
	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the shape */
	update() {
		this._path = new Path2D();
		this._path.arc(this._x, this._y, this._radius, 0, 2* Math.PI);
	}
}