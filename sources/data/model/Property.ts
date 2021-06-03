import { Node } from "../Node";

/** Defines a Property of a Class. */
export class Property extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name of the property. */
	name: string;

	/** The description of the property. */
	description: string;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) {
		if (!data.name) throw Error("Property without name");
		this.name = data.name; this.description = data.description;
	}
}