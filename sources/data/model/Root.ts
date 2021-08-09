import { Node } from "../Node";
import { NodeSet } from "../NodeSet";
import { String } from "../types/String";
import { Ontology } from "./Ontology";
import { Style } from "./Style";

/** Defines the Root of a SHISHO knowledge base. */
export class Root extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name/title of the Root. */
	private _name: String;

	/** The description of the Root. */
	private _description: String;

	/** The author(s) of the Root. */
	private _author: String;

	/** The ontology of the Root. */
	private _ontology: Ontology;

	/** The graphical styles. */
	private _styles: NodeSet<Style>;

	
	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Root. */
	get name(): String { return this._name; }

	/** The description of the Root. */
	get description(): String { return this._description; }

	/** The author of the Root. */
	get author(): String { return this._author; }	
	
	/** The ontology of the Root. */
	get ontology(): Ontology { return this._ontology; }	

	/** The styles of the Root. */
	get styles(): NodeSet<Style> { return this._styles; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Root instance.
	 * @param data The initialization data. */
	constructor(data?: any) {
		// Call the base class constructor
		super("root", null, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._author = new String("author", this);
		this._ontology = new Ontology("ontology", this);
		this._styles = new NodeSet<Style>("styles", this, Style); 

		// Deserialize the initialization data
		if (data) this.deserialize(data);
	}

}