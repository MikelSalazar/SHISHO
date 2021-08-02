import { Node } from "../Node";
import { Property } from "./Property";
import { Vector } from "../types/Vector";

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
	constructor(data: any = null) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Class instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {

		// Check if we have to clean the data (when not combining)
		if (!combine || !this.name) {
			this.name = data.name; this.description = data.description;
			this.properties = {}; this.positions = [];
		}

		// Deserialize the properties of the class
		if (data.properties) data.properties.forEach(propertyData => {
			let name = propertyData.name;
			if (!name) throw Error ("Property without name.");
			if (!this.properties[name]) this.properties[name] = new Property();
			this.properties[name].deserialize(propertyData, combine);
		});
		
		// Deserialize the positions of the class
		if (data.positions) data.positions.forEach(positionData => {
			this.positions.push(new Vector(positionData));
		});
	}
}