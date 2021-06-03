import { createElement } from "../Viewport";
import { Widget } from "../Widget";

/** Defines a text widget. */
export class Label extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The text of the label. */
	private _text: string;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the label. */
	get text() : string { return this._text}
	set text(value:string) { this._element.innerHTML = this._text = value; }

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Label class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param text The text of the label. */
	constructor(name:string, parent:Widget, text: string) {

		// Call the base class constructor
		super(name, parent, createElement("label", null));

		// Save the text
		this.text = text;
	}
}