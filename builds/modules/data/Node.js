/** Defines a data Node. */
export class Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeType The type of the Node.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeType, nodeName, nodeParent, nodeData) {

		// ---------------------------------------------------------- PUBLIC FIELDS

		/** Marks the object as a Node. */
		this.isNode = true;

		// Initialize the data of the node
		this._nodeType = nodeType || "node";
		this._nodeName = nodeName;
		this._nodeParent = nodeParent;
		this._nodeChildren = [];

		// Create a link between the node and its parent
		if (nodeParent)
			nodeParent._nodeChildren.push(this);

		// Send an update request upwards in the Node hierarchy
		this._nodeUpdated = true;
		this.nodeUpdated = false;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Node. */
	get nodeName() { return this._nodeName; }

	/** The type of the Node. */
	get nodeType() { return this._nodeType; }

	/** The parent Node. */
	get nodeParent() { return this._nodeParent; }

	/** The child Nodes. */
	get nodeChildren() { return this._nodeChildren; }

	/** Indicates if the Node has been updated or not. */
	get nodeUpdated() { return this._nodeUpdated; }
	set nodeUpdated(value) {

		// If the value provided is the same than the current one, do nothing
		if (this._nodeUpdated == value)
			return;

		// Propagate "true" values downwards in the node hierarchy
		if (value)
			for (let child in this._nodeChildren)
				this._nodeChildren[child].nodeUpdated = false;

		// Otherwise, propagate "false" values upwards in the node hierarchy
		else if (this._nodeParent)
			this._nodeParent.nodeUpdated = false;

		// Apply the new value
		this._nodeUpdated = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the Node.
	 * @param deltaTime The update time.
	 * @param forced Indicates whether the update is forced or not. */
	update(deltaTime = 0, forced = false) {

		// If the update is not forced, skip it when the node is already updated
		if (this._nodeUpdated && !forced)
			return;

		// Call the event function
		if (Node.onPreUpdate)
			Node.onPreUpdate(this);

		// Update the children
		for (let child of this._nodeChildren)
			child.update(deltaTime, forced);

		// Call the event function
		if (Node.onPostUpdate)
			Node.onPostUpdate(this);

		// Mark this node as updated
		this._nodeUpdated = true;
	}


	/** Serializes the Node instance.
	 * @param mode The serialization mode.
	 * @return The serialized data. */
	serialize(mode) {

		// Create an object to serialize the Node
		let serializedData = {};

		// Save the name of the node
		// if (this.nodeName) serializedData.name = this.nodeName;

		// Serialize the child nodes
		for (let child of this._nodeChildren)
			if (child.nodeName)
				serializedData[child.nodeName] = child.serialize(mode);

		// Return the object with the serialized data
		return serializedData;
	}


	/** Deserializes the Node instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	deserialize(data = {}, mode) {

		// If the data is a string, check if it is JSON or CSV data
		if (typeof data == "string")
			JSON.parse(data);

		// If the data is an array, try to parse it value by value
		if (Array.isArray(data)) {
			for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
				if (dataIndex >= this.nodeChildren.length)
					return;
				this.nodeChildren[dataIndex].deserialize(data[dataIndex], mode);
			}
		}

		// If the data is an object, analyze it key by key
		else
			for (let dataKey in data) {
				if (data[dataKey] == undefined)
					continue;
				for (let child of this._nodeChildren) {
					if (child._nodeName == dataKey) {
						child.deserialize(data[dataKey], mode);
						break;
					}
				}
			}
	}
}
