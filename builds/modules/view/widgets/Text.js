import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";

/** Defines a text widget. */
export class Text extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Label class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param text The text of the text. */
	constructor(name, parent, text) {

		// Call the base class constructor
		super(name, parent, createElement("p", null));

		// Save the text
		this.text = text;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the text. */
	get text() { return this._text; }
	set text(value) { this._element.innerHTML = this._text = value; }
}
