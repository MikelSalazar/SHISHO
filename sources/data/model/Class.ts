import { Node } from "../Node";
import { Property } from "./Property";
import { Vector } from "./Vector";

/** Defines a Class of an Ontology. */
export class Class extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name of the class. */
	name: string;

	/** The description of the class. */
	description: string;

	/** The properties of the class. */
	properties: Record<string, Property> = {};

	/** The positions of the class. */
	positions: Vector[] = [];
	

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) {
		if (!data.name) throw Error("Class without name");
		this.name = data.name; this.description = data.description || "";
		this.properties = {};
		if (data.properties) data.properties.forEach(propertyData => {
			if (!propertyData.name) throw Error("Property without name");
			this.properties[propertyData.name] = new Property(propertyData);
		});
		this.positions = [];
		if (data.positions) data.positions.forEach(positionData => {
			this.positions.push(new Vector(positionData));
		});
	}
}