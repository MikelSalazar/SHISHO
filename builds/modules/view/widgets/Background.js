import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";

/** Defines a background. */
export class Background extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Background class.
	 * @param name The widget name;
	 * @param parent The parent widget. */
	constructor(name, parent) {

		// Call the base class constructor
		super(name, parent, createElement("div", parent.element, parent.element + "Background", null, "ShishoBackground"));

		this._removeIfHidden = true;
	}
}
