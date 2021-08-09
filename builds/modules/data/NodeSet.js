import { Node } from "./Node.js";

/** Define a set of data Nodes. */
export class NodeSet extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the NodeSet class.
	 * @param name The name of the NodeSet.
	 * @param parent The parent Node.
	 * @param nodeSubtype The node subtype of the NodeSet.
	 * @param data The initialization data. */
	constructor(name, parent, nodeSubtype, data) {

		// Call the parent class constructor
		super("nodeset", name, parent, data);

		// Set the node subtype
		this._nodeSubtype = nodeSubtype;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The children Nodes (converted to the type). */
	get typedChildren() {
		return this.nodeChildren;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the Node instance.
	 * @param mode The serialization mode.
	 * @return The serialized data. */
	serialize(mode) {

		// Create an object to serialize the Node
		let array = [];

		// Serialize the child nodes
		for (let childName in this._nodeChildren)
			array.push(this._nodeChildren[childName].serialize(mode));

		// Return the object with the serialized data
		return array;
	}


	/** Deserializes the NodeSet instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	deserialize(data, mode) {
		if (Array.isArray(data)) {
			for (const datum of data)
				new this._nodeSubtype(datum.name, this, datum);
		}
		else
			for (const key in data) {
				let node = new this._nodeSubtype(key, this, data[key]);
				this[key] = node;
			}
	}


	/** Gets a specific Node in the collection.
	 * @param name The name of the node to get. */
	get(name) { return this[name]; }


	/** Gets a node by index.
	 * @param index The index of the node to get.
	 * @returns The node with the given index. */
	getIndex(index) {
		return this.nodeChildren[index];
	}


	/** Provides an iterator to navigate though the NodeSet. */
	[Symbol.iterator]() {
		let pointer = 0;
		let items = this._nodeChildren;
		return {
			next() {
				if (pointer < items.length)
					return { done: false,
						value: items[pointer++] };
				else
					return { done: true, value: null };
			}
		};
	}
}
