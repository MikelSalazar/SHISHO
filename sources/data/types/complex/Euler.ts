import { Node } from "../../Node";
import { Angle } from "../measures/Angle";

/** Defines the Euler Orientation. 
 * @see https://en.wikipedia.org/wiki/Euler_angles */ 
export class Euler extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The Angle in the X axis. */
	private _x : Angle;

	/** The Angle in the Y axis. */
	private _y : Angle;

	/** The Angle in the Z axis. */
	private _z : Angle;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The Angle in the X axis. */
	get x() { return this._x; }

	/** The Angle in the Y axis. */
	get y() { return this._y; }

	/** The Angle in the Z axis. */
	get z() { return this._z; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR
	
	/** Initializes a new instance of the EulerOrientation class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent constructor
		super ("euler", nodeName, nodeParent, nodeData);

		// Create the children nodes
		this._x = new Angle("x", this, 0);
		this._y = new Angle("y", this, 0);
		this._z = new Angle("z", this, 0);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}
}
