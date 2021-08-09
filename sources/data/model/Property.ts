import { Node } from "../Node";
import { String } from "../types/String";
import { Class } from "./Class";


/** Defines a Property of a Class. */
export class Property extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the Property. */
	private _name: String;

	/** The description of the Property. */
	private _description: String;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Property. */
	get name(): String { return this._name; }

	/** The description of the Property. */
	get description(): String { return this._description; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param parentClass The class the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName?: string, parentClass?: Class, data?: any) { 
		
		// Call the base class constructor
		super("property", nodeName, parentClass, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);

		// Deserialize the initialization data
		if (data) this.deserialize(data);
	}
}