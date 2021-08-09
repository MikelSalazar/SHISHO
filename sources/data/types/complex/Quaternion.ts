import { Node } from "../../Node";
import { Measure } from "../Measure";

/** Defines a four-dimensional complex number to describe rotations. */
export class Quaternion extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The value of the quaternion vector in the X(i) axis. */
	private _x: Measure;

	/** The value of the quaternion vector in the Y(j) axis. */
	private _y: Measure;

	/** The value of the quaternion vector in the Z(k) axis. */
	private _z: Measure;

	/** The rotation half-angle around the quaternion vector. */
	private _w: Measure;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The value of the quaternion vector in the X(i) axis. */
	get x() { return this._x; }

	/** The value of the quaternion vector in the Y(j) axis. */
	get y() { return this._y; }

	/** The value of the quaternion vector in the Z(k) axis. */
	get z() { return this._z; }

	/** The rotation half-angle around the quaternion vector. */
	get w() { return this._w; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Quaternion class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent constructor
		super("distance", nodeName, nodeParent, nodeData);

		// Create the children nodes
		this._x = new Measure("x", "x", this, 0);
		this._y = new Measure("y", "y", this, 0);
		this._z = new Measure("z", "z", this, 0);
		this._w = new Measure("w", "w", this, 1);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}
}