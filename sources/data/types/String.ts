import { Node } from "../Node";

/** Defines a String Node. */
export class String extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The current value of the String.*/
	private _value: string | undefined = undefined;

	/** The default value of the String. .*/
	private _default: string | undefined = undefined;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the String.*/
	get value(): string | undefined { return this._value; }
	set value(v: string | undefined) {
		if (this._value != v) this.nodeUpdated = false;
		this._value = v;
	}

	/** The default value of the String. .*/
	get default(): string | undefined { return this._default; }
	set default(newDefault: string | undefined) { this._default = newDefault; }


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the String class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent class constructor
		super("string", nodeName, nodeParent, nodeData);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the String instance.
	 * @return The serialized data. */
	serialize(): any { return this._value; }


	/** Deserializes the String instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	 deserialize(data: any, mode?: string) {
		if (typeof data !== "string") data = JSON.stringify(data);
		this.value = data;
	}

}