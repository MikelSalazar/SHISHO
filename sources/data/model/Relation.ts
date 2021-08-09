import { Node } from "../Node";
import { String } from "../types/String";
import { Vector } from "../types/complex/Vector";
import { Ontology } from "./Ontology";

/** Defines a Relation between two Class instances. */
export class Relation extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the Relation. */
	private _name: String;

	/** The description of the Relation. */
	private _description: String;

	/** The origin Class of the Relation. */
	private _origin: String;

	/** The target Class of the Relation. */
	private _target: String;

	/** The position of the midpoint. */
	private _midpoint: Vector;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Class. */
	get name(): String { return this._name; }

	/** The description of the Class. */
	get description(): String { return this._description; }

	/** The origin Class of the Relation. */
	get origin(): String { return this._origin; }

	/** The target Class of the Relation. */
	get target(): String { return this._target; }

	/** The target Class of the Relation. */
	get midpoint(): Vector { return this._midpoint; }

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Relation instance.
	 * @param ontology The Ontology the Relation instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName?: string, ontology?: Ontology, data?: any) {
		
		// Call the base class constructor
		super("relation", nodeName, ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._origin = new String("origin", this);
		this._target = new String("target", this);
		this._midpoint = new Vector("midpoint", this);

		// Deserialize the initialization data
		if (data) this.deserialize(data);
	}
}