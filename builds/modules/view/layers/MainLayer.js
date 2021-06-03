import { Layer } from "../Layer.js";
import { Graph } from "../widgets/Graph.js";

/** Displays the ontology in different ways. */
export class MainLayer extends Layer {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the GraphLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Main", viewport, "div");

		// The graph widget
		this._graph = new Graph("Graph", this);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The graph widget. */
	get name() { return this._name; }
}
