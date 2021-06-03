import { Layer } from "../Layer";
import { Shape } from "../Shape";
import { Viewport } from "../Viewport";
import { Graph } from "../widgets/Graph";

/** Displays the ontology in different ways. */
export class MainLayer extends Layer {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The graph widget. */
	private _graph: Graph;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The graph widget. */
	get name():string { return this._name; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the GraphLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor (viewport: Viewport) {

		// Call the base class constructor
		super("Main", viewport, "div");

		// The graph widget
		this._graph = new Graph("Graph", this);
	}

}