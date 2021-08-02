import { Node } from "../Node.js";
import { Class } from "./Class.js";
import { Relation } from "./Relation.js";

/** Defines an Ontology. */
export class Ontology extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data = null) {
		super(data);

		// ---------------------------------------------------------- PUBLIC FIELDS

		/** The classes of the ontology. */
		this.classes = {};

		/** The relations between classes. */
		this.relations = {};
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Ontology instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// If we combine the ontology
		if (!combine) {
			this.classes = {};
			this.relations = {};
		}

		// Parse the classes
		if (data.classes) {
			let classIds = Object.keys(data.classes);
			classIds.forEach(classId => {
				let classData = data.classes[classId];
				if (!classId)
					throw Error("Class without name.");
				if (!this.classes[classId])
					this.classes[classId] = new Class();
				this.classes[classId].deserialize(classData, combine);
			});
		}

		// Parse the relations
		if (data.relations) {
			let relationIds = Object.keys(data.relations);
			relationIds.forEach(relationId => {
				let relationData = data.relations[relationId];
				if (!relationId)
					throw Error("Class without name.");
				if (!this.relations[relationId])
					this.relations[relationId] = new Relation();
				this.relations[relationId].deserialize(relationData, combine);
			});
		}

	}
}
