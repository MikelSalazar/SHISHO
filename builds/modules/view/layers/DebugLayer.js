import { Layer } from "../Layer.js";
import { Label } from "../widgets/Label.js";


/** Manages debug panel. */
export class DebugLayer extends Layer {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the DebugLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Debug", viewport, "div");

		this._FPSValue = 0;


		this._FPSLabel = new Label("FPS", this, "FPS: 0");
		this._FPSLabel.element.className = "ShishoDebugFPSLabel";

	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer.
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {
		if (this._FPSValue != this.viewport.FPS) {
			this._FPSValue = this.viewport.FPS;
			this._FPSLabel.text = "FPS: " + this._FPSValue;
		}

	}
}
