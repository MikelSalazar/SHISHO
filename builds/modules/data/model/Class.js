import { Node } from "../Node.js";
import { Property } from "./Property.js";
import { Vector } from "./Vector.js";

/** Defines a Class of an Ontology. */
export class Class extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The properties of the class. */
		this.properties = {};

		/** The positions of the class. */
		this.positions = [];
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Class without name");
		this.name = data.name;
		this.description = data.description || "";
		this.properties = {};
		if (data.properties)
			data.properties.forEach(propertyData => {
				if (!propertyData.name)
					throw Error("Property without name");
				this.properties[propertyData.name] = new Property(propertyData);
			});
		this.positions = [];
		if (data.positions)
			data.positions.forEach(positionData => {
				this.positions.push(new Vector(positionData));
			});
	}
}
