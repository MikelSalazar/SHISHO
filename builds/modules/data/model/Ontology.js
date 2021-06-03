import { Node } from "../Node.js";
import { Class } from "./Class.js";
import { Relation } from "./Relation.js";

/** Defines an Ontology. */
export class Ontology extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The classes of the ontology. */
		this.classes = {};

		/** The realtions of the classes. */
		this.relations = {};
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data = {}) {
		// if (!data.name) throw Error("Ontology without name");
		this.name = data.name;
		this.description = data.description || "";
		this.classes = {};
		if (data.classes)
			data.classes.forEach(classData => {
				if (!classData.name)
					throw Error("Class without name");
				this.classes[classData.name] = new Class(classData);
			});
		this.relations = {};
		if (data.relations)
			data.relations.forEach(relationData => {
				if (!relationData.name)
					throw Error("Relation without name");
				this.relations[relationData.name] = new Relation(relationData);
			});
	}
}
