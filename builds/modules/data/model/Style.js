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
	set shape(value) { this._shape = value; }

	/** The width of the shape. */
	get width() { return this.parsePropertyValue('_width'); }
	set width(value) { this._width = value; }

	/** The height of the shape. */
	get height() { return this.parsePropertyValue('_height'); }
	set height(value) { this._height = value; }

	/** The radius of the shape. */
	get radius() { return this.parsePropertyValue('_radius'); }
	set radius(value) { this._radius = value; }

	/** The secondary radius of the shape. */
	get radius2() { return this.parsePropertyValue('_radius2'); }
	set radius2(value) { this._radius2 = value; }

	/** The color of the style. */
	get color() { return this.parsePropertyValue('_color'); }
	set color(value) { this._color = value; }

	/** The color of the border. */
	get borderColor() { return this.parsePropertyValue('_borderColor'); }
	set borderColor(value) { this._borderColor = value; }

	/** The width of the border. */
	get borderWidth() { return this.parsePropertyValue('_borderWidth'); }
	set borderWidth(value) { this._borderWidth = value; }

	/** The font of the text. */
	get textFont() { return this.parsePropertyValue('_textFont'); }
	set textFont(value) { this._textFont = value; }

	/** The size of the text. */
	get textSize() { return this.parsePropertyValue('_textSize'); }
	set textSize(value) { this._textSize = value; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign() { return this.parsePropertyValue('_textAlign'); }
	set textAlign(value) { this._textAlign = value; }

	/** The color of the text. */
	get textColor() { return this.parsePropertyValue('_textColor'); }
	set textColor(value) { this._textColor = value; }

	/** The icon of the shape. */
	get icon() { return this.parsePropertyValue('_icon'); }
	set icon(value) { this._icon = value; }

	/** The icon color of the style. */
	get iconColor() { return this.parsePropertyValue('_iconColor'); }
	set iconColor(value) { this._iconColor = value; }

	/** The icon size of the style. */
	get iconSize() { return this.parsePropertyValue('_iconSize'); }
	set iconSize(value) { this._iconSize = value; }

	/** The icon offset X of the style. */
	get iconOffsetX() { return this.parsePropertyValue('_iconOffsetX'); }
	set iconOffsetX(value) { this._iconOffsetX = value; }

	/** The icon offset X of the style. */
	get iconOffsetY() { return this.parsePropertyValue('_iconOffsetY'); }
	set iconOffsetY(value) { this._iconOffsetY = value; }


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
		if (data.shape)
			this.shape = data.shape;
		if (data.width)
			this.width = data.width;
		if (data.height)
			this.height = data.height;
		if (data.radius)
			this.radius = data.radius;
		if (data.radius2)
			this.radius2 = data.radius2;
		if (data.color)
			this.color = data.color;
		if (data.borderColor)
			this.borderColor = data.borderColor;
		if (data.borderWidth)
			this.borderWidth = data.borderWidth;
		if (data.textFont)
			this.textFont = data.textFont;
		if (data.textSize)
			this.textSize = data.textSize;
		if (data.textAlign)
			this.textAlign = data.textAlign;
		if (data.textColor)
			this.textColor = data.textColor;
		if (data.icon)
			this.icon = data.icon;
		if (data.iconColor)
			this.iconColor = data.iconColor;
		if (data.iconSize)
			this.iconSize = data.iconSize;
		if (data.iconOffsetX)
			this.iconOffsetX = data.iconOffsetX;
		if (data.iconOffsetY)
			this.iconOffsetY = data.iconOffsetY;
	}


	/** Obtains the value of a property.
	 * @param propertyName The name of the property. */
	parsePropertyValue(propertyName) {
		let v = this[propertyName], p = this._parent;
		// if (v == null && p !== null) return p.parsePropertyValue(propertyName);
		// if (v.endsWith())
		// return this._color || (this._parent)? this._parent.color: null; 

		return v;
	}


	/** Combines multiple styles into one.
	 * @param styles The styles to combine. */
	static combine(styles) {
		if (!styles || styles.length == 0)
			throw Error("No styles to combine");
		if (styles.length == 1)
			return styles[0];
		let combination = styles[0];
		styles.forEach(style => { combination.deserialize(style); });
		return combination;
	}
}
