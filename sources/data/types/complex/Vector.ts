import { Node } from "../../Node";
import { Measure } from "../Measure";

/** Defines a three-dimensional vector. */
export class Vector extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The value in the X axis. */
	private _x: Measure;

	/** The value in the Y axis. */
	private _y: Measure;

	/** The value in the Z axis. */
	private _z: Measure;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The value in the X axis. */
	get x() { return this._x; }

	/** The value in the Y axis. */
	get y() { return this._y; }

	/** The value in the Z axis. */
	get z() { return this._z; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Vector3 class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent class constructor
		super("vector", nodeName, nodeParent, nodeData);

		// Create the children nodes
		this._x = new Measure("x", "x", this);
		this._y = new Measure("y", "y", this);
		this._z = new Measure("z", "z", this);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Converts the Vector3 instance into an array representation. */
	toArray(): number[] {
		return [this._x.get() || this.x.default, 
			this._y.get() || this.y.default, this._z.get() || this.z.default];
	}


	/** Sets the values of the Vector3 from an array.
	* @param values An array with the numerical values. */
	fromArray(values: number[]) {
		this._x.value = ((values.length > 0) ? values[0] : 0);
		this._y.value = ((values.length > 1) ? values[1] : 0);
		this._z.value = ((values.length > 2) ? values[2] : 0);
	}


	/** Sets the values of the Vector.
	 *  @param x The value in the X axis.
	 *  @param y The value in the Y axis.
	 *  @param z The value in the Z axis. */
	set(x?:number, y?:number, z?:number) {
		this._x.value = x; this._y.value = y; this._z.value = z;
	}
}