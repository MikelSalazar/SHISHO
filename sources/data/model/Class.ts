import { Node } from "../Node";
import { Property } from "./Property";
import { Vector } from "../types/Vector";
import { String } from "../types/String";
import { Ontology } from "./Ontology";
import { NodeSet } from "../NodeSet";

/** Defines a Class of an Ontology. */
export class Class extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the Class. */
	private _name: String;

	/** The description of the class. */
	private _description: String;

	/** The properties of the Class. */
	private _properties: NodeSet<Property>;

	/** The positions of the Class in the different Graph views. */
	private _positions: NodeSet<Vector>;

	
	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Class. */
	get name(): String { return this._name; }

	/** The description of the Class. */
	get description(): String { return this._description; }
	
	/** The properties of the Class. */
	get properties(): NodeSet<Property> { return this._properties; }
	
	/** The positions of the Class in the different Graph views. */
	get positions(): NodeSet<Vector> { return this._positions; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param ontology The Ontology the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName?: string, ontology?: Ontology, data?: any) { 
		
		// Call the base class constructor
		super(nodeName || "class", ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._properties = new NodeSet<Property>("properties", this, Property);
		this._positions = new NodeSet<Vector>("positions", this, Vector);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Class instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name) this._name.deserialize(data.name);
		else throw Error ("Class without name.");
		if (data.description) this._description.deserialize(data.description);
		if (data.properties) this._properties.deserialize(data.properties);
		if (data.positions) this._positions.deserialize(data.positions);
	}
}