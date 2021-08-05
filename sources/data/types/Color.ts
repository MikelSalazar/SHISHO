import { Node } from "../Node";
import { Number } from "./Number";

/** Defines a RGB Color. */
export class Color extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The red component of the Color. */
	private _r: Number;

	/** The green component of the Color. */
	private _g: Number;

	/** The blue component of the Color. */
	private _b: Number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The red component of the Color. */
	get r(): Number { return this._r; }

	/** The green component of the Color. */
	get g(): Number { return this._g; }

	/** The blue component of the Color. */
	get b(): Number { return this._b; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Color class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, data?: any) { 
				
		// Call the base class constructor
		super(nodeName || "color", nodeParent, data);

		// Initialize the child nodes
		this._r = new Number("r", this);
		this._g = new Number("g", this);
		this._b = new Number("b", this);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	 deserialize(data: any, combine: boolean = true) {
		
		// If the data is an array, copy the first three values
		if (Array.isArray(data)) this.set(data[0], data[1], data[2]);
		// Otherwise, get the different values
		else {
			if (data.r != undefined) this._r.value = data.r;
			if (data.g != undefined) this._g.value = data.g;
			if (data.b != undefined) this._b.value = data.b;
		}
	}


	/** Sets the values of the Color.
	 * @param r The value of the Red component Color
	 * @param g The value of the Green component Color.
	 * @param b The value of the Blue component Color. */
	set(r: number = 0, g: number = 0, b: number = 0) {
		this._r.value = r; this._g.value = g; this._b.value = b;
	}

	/** Gets the representation of the Color. */
	get() : string {
		return "rgb(" + this._r.value + ", " + this._g.value  + ", " + 
			this._b.value + ")";
	}
}
