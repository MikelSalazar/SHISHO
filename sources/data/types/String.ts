import { Node } from "../Node";

/** Defines a Text Node. */
export class String extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The value of the String. */
	private _value: string;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the String. */
	get value(): string { return this._value; }
	set value(value: string) {
		// Ift he value is different, mark the node for update
		if (this.value != value) this.nodeUpdated = false;

		// Set the new value
		this._value = value;
	}

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the String class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName: string, nodeParent: Node, data: any = {}) {
		// Call the base class constructor
		super(nodeName || "string", nodeParent, data);

		// Initialize the value
		this._value = undefined;

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS
	
	/** Serializes the instance.
	 * @return The serialized data. */
	 serialize(): any {  return this._value; }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any, combine: boolean = true) {
		if (data == null) this.value = null;
		else if (typeof data == "string") this.value = data as string;
	}


}
