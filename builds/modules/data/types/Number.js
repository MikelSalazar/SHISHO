import { Node } from "../Node.js";

/** Defines a Number Node. */
export class Number extends Node {


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeName, nodeParent, nodeData) {

		// Call the parent class constructor
		super("number", nodeName, nodeParent, nodeData);

		// --------------------------------------------------------- PRIVATE FIELDS

		/** The current value of the Number.*/
		this._value = undefined;

		/** The default value of the Number. .*/
		this._default = undefined;

		// Deserialize the initialization data
		if (nodeData)
			this.deserialize(nodeData);
	}


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the Number.*/
	get value() { return this._value; }
	set value(v) {
		if (this._value != v)
			this.nodeUpdated = false;
		this._value = v;
	}

	/** Gets the default value of the Number. */
	get default() { return this._default; }
	set default(newDefault) { this._default = newDefault; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the Number instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the Number instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	deserialize(data, mode) {
		if (data == undefined)
			this.value = undefined;
		else if (typeof data !== "number")
			this.value = parseFloat(data);
		else
			this.value = data;
	}
}
