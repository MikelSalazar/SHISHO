/** Defines a data node. */
export abstract class Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param data The data of the Node. */
	constructor (data:any = null) { if (data) this.deserialize(data, false); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The JSON representation of the instance. */
	serialize(): string { return JSON.stringify(this, null,'\t'); }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {
		if (typeof data == "string") return JSON.parse(data);
	}
}