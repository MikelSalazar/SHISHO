import { Node } from "../Node.js";
import { Property } from "./Property.js";
import { Vector } from "../types/Vector.js";

/** Defines a Class of an Ontology. */
export class Class extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param data The initialization data. */
	constructor(data = null) {
		super(data);

		/** The properties of the class. */
		this.properties = {};

		/** The positions of the class. */
		this.positions = [];
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Class instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Check if we have to clean the data (when not combining)
		if (!combine || !this.name) {
			this.name = data.name;
			this.description = data.description;
			this.properties = {};
			this.positions = [];
		}

		// Deserialize the properties of the class
		if (data.properties)
			data.properties.forEach(propertyData => {
				let name = propertyData.name;
				if (!name)
					throw Error("Property without name.");
				if (!this.properties[name])
					this.properties[name] = new Property();
				this.properties[name].deserialize(propertyData, combine);
			});

		// Deserialize the positions of the class
		if (data.positions)
			data.positions.forEach(positionData => {
				this.positions.push(new Vector(positionData));
			});
	}
}
