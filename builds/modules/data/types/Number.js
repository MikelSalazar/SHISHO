import { Node } from "../Node.js";

/** Defines a Number Node. */
export class Number extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class nada
		super(nodeName || "string", nodeParent, data);

		// Initialize the value
		this._value = undefined;

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the Number. */
	get value() { return this._value; }
	set value(value) {
		// Ift he value is different, mark the node for update
		if (this.value != value)
			this.nodeUpdated = false;

		// Set the new value
		this._value = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		if (data == null)
			this.value = 0;
		else if (typeof data == "number")
			this.value = data;
	}
}

