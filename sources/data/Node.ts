/** Defines a data Node. */
export abstract class Node {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The name of the Node. */
	protected _nodeName: string | undefined;

	/** The type of the Node. */
	protected _nodeType: string;

	/** The parent Node. */
	protected _nodeParent: Node | undefined;

	/** The child Nodes. */
	protected _nodeChildren: Node[];

	/** Indicates whether the Node has been updated or not. */
	protected _nodeUpdated: boolean;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Node. */
	get nodeName(): string | undefined { return this._nodeName; }

	/** The type of the Node. */
	get nodeType(): string { return this._nodeType; }

	/** The parent Node. */
	get nodeParent(): Node | undefined { return this._nodeParent; }

	/** The child Nodes. */
	get nodeChildren(): Node[]{ return this._nodeChildren; }

	/** Indicates if the Node has been updated or not. */
	get nodeUpdated(): boolean { return this._nodeUpdated; }
	set nodeUpdated(value: boolean) {

		// If the value provided is the same than the current one, do nothing
		if (this._nodeUpdated == value) return;

		// Propagate "true" values downwards in the node hierarchy
		if (value) for (let child in this._nodeChildren) 
			this._nodeChildren[child].nodeUpdated = false;

		// Otherwise, propagate "false" values upwards in the node hierarchy
		else if (this._nodeParent) this._nodeParent.nodeUpdated = false;

		// Apply the new value
		this._nodeUpdated = value
	}

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** Marks the object as a Node. */
	public isNode: boolean = true;

	/** A function callback to be used before the node update. */
	public static onPreUpdate: CallableFunction;

	/** A function callback to be used before the node update. */
	public static onPostUpdate: CallableFunction;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeType The type of the Node.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeType: string, nodeName?: string, nodeParent?: Node, 
		nodeData?: any) {

		// Initialize the data of the node
		this._nodeType = nodeType || "node";
		this._nodeName = nodeName;
		this._nodeParent = nodeParent;
		this._nodeChildren = [];

		// Create a link between the node and its parent
		if (nodeParent) nodeParent._nodeChildren.push(this);

		// Send an update request upwards in the Node hierarchy
		this._nodeUpdated = true; this.nodeUpdated = false;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the Node. 
	 * @param deltaTime The update time.
	 * @param forced Indicates whether the update is forced or not. */
	update(deltaTime: number = 0, forced: boolean = false) {

		// If the update is not forced, skip it when the node is already updated
		if (this._nodeUpdated && !forced) return;

		// Call the event function
		if (Node.onPreUpdate) Node.onPreUpdate(this);

		// Update the children
		for (let child of this._nodeChildren) 
			child.update(deltaTime, forced);

		// Call the event function
		if (Node.onPostUpdate) Node.onPostUpdate(this);

		// Mark this node as updated
		this._nodeUpdated = true;
	}


	/** Serializes the Node instance.
	 * @param mode The serialization mode.
	 * @return The serialized data. */
	serialize(mode?: string): any {

		// Create an object to serialize the Node
		let serializedData: any = {};

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
	deserialize(data: any = {}, mode?: string) {

		// If the data is a string, check if it is JSON or CSV data
		if (typeof data == "string") JSON.parse(data);

		// If the data is an array, try to parse it value by value
		if (Array.isArray(data)) {
			for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
				if (dataIndex >= this.nodeChildren.length) return;
				this.nodeChildren[dataIndex].deserialize(data[dataIndex], mode);
			}
		}

		// If the data is an object, analyze it key by key
		else for (let dataKey in data) {
			if(data[dataKey] == undefined) continue;
			for (let child of this._nodeChildren) {
				if (child._nodeName == dataKey) { 
					child.deserialize(data[dataKey], mode); break; 
				}
			}
		}
	}
}