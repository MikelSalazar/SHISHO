import { Node } from "../Node";

/** Defines a Number Node. */
export class Number extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The value of the Number. */
	private _value: number;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the Number. */
	get value(): number { return this._value; }
	set value(value: number) { 
		// Ift he value is different, mark the node for update
		if (this.value != value) this.nodeUpdated = false;

		// Set the new value
		this._value = value;
	}


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, data?: any) { 
		
		// Call the base class nada
		super(nodeName || "string", nodeParent, data);

		// Initialize the value
		this._value = undefined;

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS
	
	/** Serializes the instance.
	 * @return The serialized data. */
	serialize(): any {  return this._value; }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any, combine: boolean = true) { 
		if (data == null) this.value = 0;
		else if (typeof data == "number") this.value = data as number;
	}


}
