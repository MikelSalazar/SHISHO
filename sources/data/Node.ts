/** Defines a data node. */
export abstract class Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param data The data of the Node. */
	constructor (data:any = {}) { this.deserialize(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The JSON representation of the instance. */
	serialize(): string { return null; }


	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) { }
}