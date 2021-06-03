import { Node } from "../Node.js";

/** Defines a visual Style. */
export class Style extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name() { return this._name; }

	/** The parent of the style. */
	get parent() { return this._parent; }

	/** The shape of the style. */
	get shape() { return this.parsePropertyValue('_shape'); }
	set shape(shape) { this._shape = shape; }

	/** The width of the shape. */
	get width() { return this.parsePropertyValue('_width'); }
	set width(width) { this._width = width; }

	/** The height of the shape. */
	get height() { return this.parsePropertyValue('_height'); }
	set height(height) { this._height = height; }

	/** The radius of the shape. */
	get radius() { return this.parsePropertyValue('_radius'); }
	set radius(radius) { this._radius = radius; }

	/** The secondary radius of the shape. */
	get radius2() { return this.parsePropertyValue('_radius2'); }
	set radius2(radius2) { this._radius2 = radius2; }

	/** The color of the style. */
	get color() { return this.parsePropertyValue('_color'); }
	set color(color) { this._color = color; }

	/** The color of the border. */
	get borderColor() { return this.parsePropertyValue('_borderColor'); }
	set borderColor(color) { this._borderColor = color; }

	/** The width of the border. */
	get borderWidth() { return this.parsePropertyValue('_borderWidth'); }
	set borderWidth(width) { this._borderWidth = width; }

	/** The font of the text. */
	get textFont() { return this.parsePropertyValue('_textFont'); }
	set textFont(fontName) { this._textFont = fontName; }

	/** The size of the text. */
	get textSize() { return this.parsePropertyValue('_textSize'); }
	set textSize(size) { this._textSize = size; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign() { return this.parsePropertyValue('_textAlign'); }
	set textAlign(align) { this._textAlign = align; }

	/** The color of the text. */
	get textColor() { return this.parsePropertyValue('_textColor'); }
	set textColor(color) { this._textColor = color; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {

		// Save the name and the parent of the instance
		this._name = data.name;
		this._parent = data.parent;
		this._children = [];
		if (this._parent)
			this._children.push(this.name);

		// Parse the initialization parameters
		this.shape = data.shape;
		this.width = data.width;
		this.height = data.height;
		this.radius = data.radius;
		this.radius2 = data.radius2;
		this.color = data.color;
		this.borderColor = data.borderColor;
		this.borderWidth = data.borderWidth;
		this.textFont = data.textFont;
		this.textSize = data.textSize;
		this.textAlign = data.textAlign;
		this.textFont = data.textFont;
		this.textColor = data.textColor;
	}


	/** Obtains the value of a property.
	 * @param propertyName the name of the property. */
	parsePropertyValue(propertyName) {
		let v = this[propertyName], p = this._parent;
		// if (v == null && p !== null) return p.parsePropertyValue(propertyName);
		// if (v.endsWith())
		// return this._color || (this._parent)? this._parent.color: null; 

		return v;
	}
}
