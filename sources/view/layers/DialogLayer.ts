import { Layer } from "../Layer";
import { Viewport, createElement } from "../Viewport";


/** Manages dialog windows. */
export class DialogLayer extends Layer {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the DialogLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor (viewport : Viewport) {
		
		// Call the base class constructor
		super("Dialog", viewport, "div");
	}

	// --------------------------------------------------------- PUBLIC METHODS

	// /** Updates the layer. 
	//  * @param deltaTime The time since the last call. */
	// public update(deltaTime) {
	// 	console.log("Updated");
	// }
}