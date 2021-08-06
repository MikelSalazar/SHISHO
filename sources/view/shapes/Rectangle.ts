import { Shape } from "../Shape";

/** Defines a (rounded) Rectangle Shape. */
export class Rectangle extends Shape {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The radius of the Rectangle. */
	private _radius: number;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The radius of the Rectangle. */
	get radius(): number { return this._radius; }
	
	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Rectangle instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) {
		
		// Call the base class constructor
		super(data);

		// Process the initialization data
		this._radius = data.radius || 0;
	}
}