import { Node } from "../Node";
import { Class } from "./Class";
import { Relation } from "./Relation";

/** Defines an Ontology. */
export class Ontology extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name of the ontology. */
	name: string;

	/** The description of the ontology. */
	description: string;

	/** The classes of the ontology. */
	classes: Record<string, Class> = {};

	/** The realtions of the classes. */
	relations: Record<string, Relation> = {};


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any = {}) {
		// if (!data.name) throw Error("Ontology without name");
		this.name = data.name; this.description = data.description || "";
		this.classes = {};
		if (data.classes) data.classes.forEach(classData => {
			if (!classData.name) throw Error("Class without name");
			this.classes[classData.name] = new Class(classData);
		});
		this.relations = {};
		if (data.relations) data.relations.forEach(relationData => {
			if (!relationData.name) throw Error("Relation without name");
			this.relations[relationData.name] = new Relation(relationData);
		});
	}
}