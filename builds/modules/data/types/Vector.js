import { Node } from "../Node.js";
import { Number } from "./Number.js";

/** Defines a bi-dimensional Vector. */
export class Vector extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Vector class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class constructor
		super(nodeName || "vector", nodeParent, data);

		// Initialize the child nodes
		this._x = new Number("x", this);
		this._y = new Number("y", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the Vector in the X axis. */
	get x() { return this._x.value; }
	set x(value) { this._x.value = value; }

	/** The value of the Vector in the Y axis. */
	get y() { return this._y.value; }
	set y(value) { this._y.value = value; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		// If the data is an array, copy the first two values
		if (Array.isArray(data))
			this.set(data[0], data[1]);

		// Otherwise, get the different values
		else {
			if (data.x != undefined)
				this._x.value = data.x;
			if (data.y != undefined)
				this._y.value = data.y;
		}
	}


	/** Sets the values of the Vector.
	 * @param x The value of the Vector in the X axis.
	 * @param y The value of the Vector in the Y axis. */
	set(x = 0, y = 0) { this._x.value = x; this._y.value = y; }

	toString() { return this._x.value + ", " + this._y.value; }
}

