/** Defines a data Node. */
export class Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param name The name of the Node.
	 * @param parent The parent Node.
	 * @param data The initialization data. */
	constructor(name, parent, data = null) {

		// Initialize the data of the node
		this._nodeName = name || "node";
		this._nodeParent = parent;
		this._nodeChildren = [];
		this._nodeUpdated = false;

		// Create a link between the node and its parent
		if (parent)
			parent._nodeChildren.push(this);
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Node. */
	get nodeName() { return this._nodeName; }

	/** The parent Node. */
	get nodeParent() { return this._nodeParent; }

	/** The children Nodes. */
	get nodeChildren() { return this._nodeChildren; }

	/** Indicates if the Node has been updated or not. */
	get nodeUpdated() { return this._nodeUpdated; }
	set nodeUpdated(value) {

		// If the value provided is the same than the current one, do nothing
		if (this._nodeUpdated == value)
			return;

		// Propagate "true" values downwards in the node hierarchy
		if (value)
			this._nodeChildren.forEach(c => { c.nodeUpdated = true; });

		// Otherwise, propagate "false" values updwards in the node hierarchy
		else if (this._nodeParent)
			this._nodeParent.nodeUpdated = false;

		// Apply the new value
		this._nodeUpdated = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS


	/** Serializes the Node instance.
	 * @return The serialized data. */
	serialize() {

		// Create an object to serialize the Node
		let serializedObject = {};

		// Save the data of the children
		let childIndex = 0, childCount = this._nodeChildren.length;
		for (childIndex = 0; childIndex < childCount; childIndex++) {
			let childNode = this._nodeChildren[childIndex];
			serializedObject[childNode._nodeName] = childNode.serialize();
		}

		// Return the object with the serializated data
		return serializedObject;
	}


	/** Deserializes the Node instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (typeof data == "string")
			return JSON.parse(data);
	}
}
