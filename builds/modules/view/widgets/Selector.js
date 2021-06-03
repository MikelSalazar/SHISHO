import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";

/** Provides a way to select between multiple options. */
export class Selector extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Selector class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param label The label of the widget.
	 * @param options The options of the widget. */
	constructor(name, parent, label, options) {

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._label = label || "";
		this._options = options || [];

		// Create the element
		let parentElement = (parent && parent.element) ? parent.element : null;
		this._element = createElement("p", parentElement, name);

		// Create the label element
		this._labelElement = createElement("label", this._element, name + "Label", null, null, null, label);

		// Create the input element
		this._selectElement = createElement("select", this._element, name + "Label", null, null, null, label);


		// Create the options
		let optionIndex = 0, optionCount = this._options.length;
		for (optionIndex = 0; optionIndex < optionCount; optionIndex++) {
			let o = createElement("option", this._selectElement, null, null, null, null, this._options[optionIndex]);
			o.value = "" + optionIndex;
		}
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The selected option value. */
	get selectedOption() { return this._options[this.selectedIndex]; }

	/** The selected index. */
	get selectedIndex() { return parseInt(this._selectElement.value); }
}

