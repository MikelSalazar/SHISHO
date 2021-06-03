import { createElement } from "../Viewport";
import { Widget } from "../Widget";


/** Define a Button Widget. */
export class Button extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The text of the button. */
	private _text: string;

	/** The callbacks for the button. */
	private _callbacks: CallableFunction[] ;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the button. */
	get text(): string { return this._text; }

	/** The callbacks for the button. */
	get callbacks(): CallableFunction[] { return this._callbacks; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Dialog class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param title The title of the dialog window.
	 * @param contents The contents of the dialog window.
	 * @param buttons The buttons of the dialog window. */
	constructor(name:string, parent:Widget, text: string, 
		callbacks:CallableFunction[] = []){

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._text = text; this._callbacks = callbacks;

		// Create the element
		let parentElement = (parent && parent.element)? parent.element: null;
		this._element = createElement("div", parentElement, name, null, 
			"ShishoWindowButton",null, this._text);

		// On click, call the callback functions
		this._element.addEventListener('click', (e: MouseEvent) => {
			for (let c of this._callbacks) if(c(this) == false) return; });
	}
}