import { Node } from "../Node";

/** Defines a Relation between two Class instances. */
export class Relation extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name of the relation. */
	name: string;

	/** The description of the relation. */
	description: string;

	/** The origin class of the relation. */
	origin: string;

	/** The target class of the relation. */
	target: string;


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Relation instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) {
		if (!data.name) throw Error("Relation without name");
		this.name = data.name; this.description = data.description;
		this.origin = data.origin; this.target = data.target;
	}

}