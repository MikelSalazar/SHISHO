import { Node } from "../Node";

/** Defines a Number Node. */
export class Number extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The current value of the Number.*/
	private _value: number | undefined = undefined;

	/** The default value of the Number. .*/
	private _default: number | undefined = undefined;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the Number.*/
	get value(): number | undefined { return this._value; }
	set value(v: number | undefined) {
		if (this._value != v) this.nodeUpdated = false;
		this._value = v;
	}

	/** Gets the default value of the Number. */
	get default(): number | undefined { return this._default; }
	set default(newDefault: number | undefined) { this._default = newDefault; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent class constructor
		super("number", nodeName, nodeParent, nodeData);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the Number instance.
	 * @return The serialized data. */
	serialize(): any { return this._value; }


	/** Deserializes the Number instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	 deserialize(data: any, mode?: string) {
		if (data == undefined) this.value = undefined;
		else if (typeof data !== "number") this.value = parseFloat(data);
		else this.value = data;
	}
}