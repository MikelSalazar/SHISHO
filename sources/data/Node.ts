/** Defines a data Node. */
export abstract class Node {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The name of the Node. */
	private _nodeName: string;

	/** The parent Node. */
	private _nodeParent: Node;

	/** The children Nodes. */
	private _nodeChildren: Node[];

	/** Indicates if the Node has been updated or not. */
	private _nodeUpdated: boolean;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Node. */
	get nodeName(): string { return this._nodeName; }

	/** The parent Node. */
	get nodeParent(): Node { return this._nodeParent; }

	/** The children Nodes. */
	get nodeChildren(): Node[] { return this._nodeChildren; }

	/** Indicates if the Node has been updated or not. */
	get nodeUpdated(): boolean { return this._nodeUpdated; }
	set nodeUpdated(value: boolean) {
		
		// Propagate "true" values downwards in the node hierarchy
		if (value) this._nodeChildren.forEach(c => { c.nodeUpdated = true; });

		// Otherwise, propagate "false" values updwards in the node hierarchy
		else if(this._nodeParent) this._nodeParent.nodeUpdated = false;
			
		// Apply the value
		this._nodeUpdated = value
	}

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param name The name of the Node.
	 * @param parent The parent Node.
	 * @param data The initialization data. */
	constructor (name?: string, parent?: Node, data:any = null) { 

		// Initialize the data of the node
		this._nodeName = name || "node";
		this._nodeParent = parent;
		this._nodeChildren = [];
		this._nodeUpdated = false;

		// Create a link between the node and its parent
		if (parent) parent._nodeChildren.push(this);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	
	/** Serializes the Node instance.
	 * @return The serialized data. */
	 serialize(): any { 

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
	deserialize(data: any = {}, combine:boolean = true) {
		if (typeof data == "string") return JSON.parse(data);
	}
}