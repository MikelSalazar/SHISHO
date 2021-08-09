import { Node } from "../Node.js";

/** Defines a String Node. */
export class String extends Node {


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the String class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeName, nodeParent, nodeData) {

		// Call the parent class constructor
		super("string", nodeName, nodeParent, nodeData);

		// --------------------------------------------------------- PRIVATE FIELDS

		/** The current value of the String.*/
		this._value = undefined;

		/** The default value of the String. .*/
		this._default = undefined;

		// Deserialize the initialization data
		if (nodeData)
			this.deserialize(nodeData);
	}


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the String.*/
	get value() { return this._value; }
	set value(v) {
		if (this._value != v)
			this.nodeUpdated = false;
		this._value = v;
	}

	/** The default value of the String. .*/
	get default() { return this._default; }
	set default(newDefault) { this._default = newDefault; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the String instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the String instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	deserialize(data, mode) {
		if (typeof data !== "string")
			data = JSON.stringify(data);
		this.value = data;
	}
}
