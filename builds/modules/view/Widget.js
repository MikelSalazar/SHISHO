
/** Defines a interactive element. */
export class Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Widget instance.
	 * @param name The name of the widget.
	 * @param parent The parent widget.
	 * @param elementTag The tag of the HTML element (if any). */
	constructor(name, parent, element) {

		/** The children widgets. */
		this._children = [];

		/** The visibility of the widget. */
		this._visibility = 1;

		/** Ask for removal of the widget if it is hidden. */
		this._removeIfHidden = false;

		/** Indicates if the widget has been updated or not. */
		this._updated = false;

		// Store the given parameters
		this._name = name;
		this._parent = parent;
		this._element = element;

		// Establish the connection with the parent node
		if (parent) {
			this.parent.children.push(this);
			if (element && parent.element &&
				element.parentElement != parent.element) {
				parent.element.appendChild(element);
			}
		}
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the widget. */
	get name() { return this._name; }

	/** The HTML Element associated to the widget. */
	get element() { return this._element; }

	/** The parent widget. */
	get parent() { return this._parent; }
	set parent(newParent) {
		this._parent = newParent;
		let el = this.element;
		if (el && el.parentElement)
			el.parentElement.removeChild(el);
		if (el && this._parent.element)
			this._parent.element.appendChild(el);
	}

	/** The children widgets. */
	get children() { return this._children; }

	/** The visibility of the widget. */
	get visibility() { return this._visibility; }
	set visibility(value) {
		this._visibility = value;
		this.updated = false;
	}


	/** Indicates if the Node has been updated or not. */
	get updated() { return this._updated; }
	set updated(value) {

		// If the value provided is the same than the current one, do nothing
		if (this._updated == value)
			return;

		// Propagate "true" values downwards in the widget hierarchy
		if (value)
			this._children.forEach(c => { c._updated = true; });

		// Otherwise, propagate "false" values updwards in the widget hierarchy
		else if (this._parent)
			this._parent._updated = false;

		// Apply the new value
		this._updated = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the Widget.
	 * @param deltaTime The time since the last call.
	 * @param forced Indicates wheter to force the update or not. */
	update(deltaTime, forced = false) {

		// Check if we have to force the update
		if (this._updated && !forced)
			return;
		// console.log("Widget Updated: " + this.name);

		// Create some variables to make the update easier
		let element = this._element, parent = this._parent;

		// If it is completely hidden, remove it form the list
		if (this._removeIfHidden && this._visibility <= 0) {
			if (element && this._element.parentElement)
				element.parentElement.removeChild(element);
			if (this._parent) {
				const childIndex = parent.children.indexOf(this);
				if (childIndex >= 0)
					parent._children.splice(childIndex, 1);
			}
			return;
		}

		// Update the visibility of the HTML elements
		if (element && this._visibility != 1) {
			element.style.opacity = "" + this._visibility;
		}

		// If the visibility if less than
		if (this._visibility <= 0)
			return;

		// Update the children
		for (const child of this._children)
			child.update(deltaTime, forced);

		// Mark the widget as updated
		this.updated = true;
	}


	/** Shows the widget. */
	show() { this.visibility = 1; }

	/** Hides the widget. */
	hide() { this.visibility = 0; }


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event) {

		// Send the event backwards to the list of children
		let childIndex = 0, childCount = this._children.length;
		for (childIndex = childCount - 1; childIndex >= 0; childIndex--)
			if (this._children[childIndex].handleEvent(event))
				return true;

		return false; // By default do not capture the event
	}
}
