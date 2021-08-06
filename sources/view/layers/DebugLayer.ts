import { Layer } from "../Layer";
import { Viewport, createElement } from "../Viewport";
import { Label } from "../widgets/Label";


/** Manages debug panel. */
export class DebugLayer extends Layer {

	private _FPSValue : number = 0;

	private _FPSLabel : Label;

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the DebugLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor (viewport : Viewport) {
		
		// Call the base class constructor
		super("Debug", viewport, "div");


		this._FPSLabel = new Label("FPS", this, "FPS: 0");
		this._FPSLabel.element.className = "ShishoDebugFPSLabel"

	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer. 
	 * @param deltaTime The time since the last call. */
	public update(deltaTime) {
		if (this._FPSValue != this.viewport.FPS) {
			this._FPSValue = this.viewport.FPS;
			this._FPSLabel.text = "FPS: " + this._FPSValue;
		}
		
	}
}