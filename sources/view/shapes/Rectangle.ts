import { Shape } from "../Shape";


export class Rectangle extends Shape {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The width of the shape. */
	private _radius: number;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) {
		super(data);
		this._radius = data.radius || 0;
	}

}