import { Layer } from "../Layer.js";


/** Manages dialog windows. */
export class DialogLayer extends Layer {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the DialogLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Dialog", viewport, "div");
	}
}
