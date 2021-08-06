import { Node } from "./Node.js";

/** Defines a Node set. */
export class NodeSet extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Color class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, typeConstructor, data = {}) {
		super(nodeName || "color", nodeParent, data);
		this._typeConstructor = typeConstructor;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The children Nodes (converted to the type). */
	get children() {
		return this.nodeChildren;
	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {

		for (const key in data) {
			let node = new this._typeConstructor(key, this, data[key]);
			this[key] = node;
		}
	}

	/** Gets a specific Node in the collection.
	 * @param name The name of the node to get. */
	get(name) { return this[name]; }
}

