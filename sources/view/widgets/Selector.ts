import { createElement } from "../Viewport";
import { Widget } from "../Widget";

/** Provides a way to select between multiple options. */
export class Selector extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The text of the input element. */
	private _label: string;

	/** The HTML element for the label. */
	private _labelElement : HTMLElement;

	/** The available options. */
	private _options: string[];

	/** The HTML element for the input. */
	private _selectElement : HTMLSelectElement;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The selected option value. */
	get selectedOption(): string { return this._options[this.selectedIndex]; }

	/** The selected index. */
	get selectedIndex(): number { return parseInt(this._selectElement.value); }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Selector class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param label The label of the widget.
	 * @param options The options of the widget. */
	constructor(name:string, parent:Widget, label: string, options: string[]) {
		
		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._label = label || ""; this._options = options || [];
		
		// Create the element
		let parentElement = (parent && parent.element)? parent.element: null;
		this._element = createElement("p", parentElement, name);

		// Create the label element
		this._labelElement = createElement("label", this._element, 
			name + "Label", null, null, null, label) as HTMLElement;

		// Create the input element
		this._selectElement = createElement("select", this._element, 
			name + "Label", null, null, null, label) as HTMLSelectElement;

		
		// Create the options
		let optionIndex = 0, optionCount = this._options.length;
		for (optionIndex = 0; optionIndex < optionCount; optionIndex++) {
			let o = createElement("option", this._selectElement, null, null,
				null, null, this._options[optionIndex]) as HTMLOptionElement;
			o.value = "" + optionIndex;
		}
	}
}
