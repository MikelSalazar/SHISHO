import { Node } from "../Node";
import { Number } from "./Number";
import { String } from "./String";

/** Defines a Measure. */
export class Measure extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The numeric value of the Measure. */
	private _quantity: Number;

	/** The type of unit of the Measure. */
	private _unit: String;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The numeric value of the Measure. */
	get quantity(): Number { return this._quantity; }

	/** The type of unit of the Measure. */
	get unit(): String { return this._unit; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, data?: any) { 
		
		// Call the base class constructor
		super(nodeName || "measure", nodeParent, data);

		// Initialize the child nodes
		this._quantity = new Number("quantity", this);
		this._unit = new String("unit", this);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any, combine: boolean = true) {
		if (typeof data == "number") this._quantity.value = data;
		else if (typeof data == "string") this._quantity.value = parseInt(data);
		// Get the different values
		else {
			if (data.quantity != undefined) this.quantity.value = data.quantity;
			if (data.unit != undefined) this.unit.value = data.unit;
		}
	}


	/** Sets the values of the Measure.
	 * @param quantity The numeric value of the Measure.
	 * @param unit The type of unit of the Measure. */
	set(quantity: number, unit: string) {
		this.quantity.value = quantity; this.unit.value = unit;
	}

	/** Gets the actula numeric value. */
	get(): number {
		return this.quantity.value;
	}
}
