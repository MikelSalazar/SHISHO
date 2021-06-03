import { Node } from "../Node";
import { Ontology } from "./Ontology";
import { Style } from "./Style";

/** Defines the Root of a SHISHO data model. */
export class Root extends Node {

	// ---------------------------------------------------------- PUBLIC FIELDS

	/** The name/title of the SHISHO document. */
	name: string;

	/** The description of the SHISHO document. */
	description: string;

	/** The author(s) of the SHISHO document. */
	author: string;

	/** The ontology data. */
	ontology: Ontology;

	/** The graphical styles. */
	styles: Record<string, Style> = {};

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any = {}) {
		this.name = data.name;
		this.description = data.description;
		this.author = data.author;
		this.ontology = new Ontology(data.ontology);
	}
}