import { Node } from "../../Node.js";
import { Measure } from "../Measure.js";

/** Defines a four-dimensional complex number to describe rotations. */
export class Quaternion extends Node {


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Quaternion class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeName, nodeParent, nodeData) {

		// Call the parent constructor
		super("distance", nodeName, nodeParent, nodeData);

		// Create the children nodes
		this._x = new Measure("x", "x", this, 0);
		this._y = new Measure("y", "y", this, 0);
		this._z = new Measure("z", "z", this, 0);
		this._w = new Measure("w", "w", this, 1);

		// Deserialize the initialization data
		if (nodeData)
			this.deserialize(nodeData);
	}


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The value of the quaternion vector in the X(i) axis. */
	get x() { return this._x; }

	/** The value of the quaternion vector in the Y(j) axis. */
	get y() { return this._y; }

	/** The value of the quaternion vector in the Z(k) axis. */
	get z() { return this._z; }

	/** The rotation half-angle around the quaternion vector. */
	get w() { return this._w; }
}
