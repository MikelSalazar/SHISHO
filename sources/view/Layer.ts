import { createElement, Viewport } from "./Viewport";
import { Widget } from "./Widget";

/** Defines a layer/view of an Ontology Editor. */
export abstract class Layer extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The viewport the layer belongs to. */
	protected _viewport : Viewport;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The viewport the layer belongs to. */
	get viewport(): Viewport { return this._viewport; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Layer instance.
	 * @param name The name of the layer.
	 * @param viewport The Viewport the layer belongs to.
	 * @param elementTag The tag of the element. */
	constructor (name: string, viewport: Viewport, elementTag: string) {

		// Call the base class constructor
		super(name, null, createElement(elementTag, viewport.element, 
			viewport.element.id + name, null, "ShishoLayer"));

		// Store the name of the layer and the Viewport reference
		this._name = name; this._viewport = viewport;
	
	}
}