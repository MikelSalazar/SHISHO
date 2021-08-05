import { Node } from "../Node";
import { NodeSet } from "../NodeSet";
import { Class } from "./Class";
import { Relation } from "./Relation";
import { Root } from "./Root";

/** Defines an Ontology. */
export class Ontology extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The classes of the ontology. */
	private _classes: NodeSet<Class>;

	/** The relations between classes. */
	private _relations: NodeSet<Relation>;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The classes of the ontology. */
	get classes(): NodeSet<Class> { return this._classes; }

	/** The relations of the ontology. */
	get relations(): NodeSet<Relation> { return this._relations; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Ontology instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName?: string, root?: Root, data?: any) {
		
		// Call the base class constructor
		super(nodeName || "ontology", root, data);

		// Initialize the child nodes
		this._classes = new NodeSet<Class>("classes", this, Class);
		this._relations = new NodeSet<Relation>("relation", this, Relation);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Ontology instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {
		if (data.classes) this._classes.deserialize(data.classes);
		if (data.relations) this._relations.deserialize(data.relations);
1	}
}