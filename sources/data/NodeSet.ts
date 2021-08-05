import { Node } from "./Node";

/** Defines a Node set. */
export class NodeSet<NodeType> extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the Node. */
	private _typeConstructor: any;

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Color class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName: string, nodeParent: Node | null, 
		typeConstructor: any, data: any = {}) { 
		super(nodeName || "color", nodeParent, data);
		this._typeConstructor = typeConstructor;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The children Nodes (converted to the type). */
	get children(): NodeType[] { 
		return (this.nodeChildren as unknown) as NodeType[];
	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any, combine: boolean = true) {
		
		for (const key in data) {
			let node: Node = new this._typeConstructor(key, this, data[key]);
			this[key] = node;
		}
	}
}
