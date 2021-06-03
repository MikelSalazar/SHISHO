import { createElement } from "./Viewport.js";
import { Widget } from "./Widget.js";

/** Defines a layer/view of an Ontology Editor. */
export class Layer extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Layer instance.
	 * @param name The name of the layer.
	 * @param viewport The Viewport the layer belongs to.
	 * @param elementTag The tag of the element. */
	constructor(name, viewport, elementTag) {

		// Call the base class constructor
		super(name, null, createElement(elementTag, viewport.element, viewport.element.id + name, null, "ShishoLayer"));

		// Store the name of the layer and the Viewport reference
		this._name = name;
		this._viewport = viewport;

	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The viewport the layer belongs to. */
	get viewport() { return this._viewport; }
}
