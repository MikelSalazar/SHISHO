import { Node } from "../Node";

/** Defines a visual Style. */
export class Style extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the style. */
	private _name: string;

	/** The parent style. */
	private _parent: string;

	/** The children styles. */
	private _children: string[];

	/** The type of shape of the style. */
	private _shape: string;

	/** The width of the shape. */
	private _width: string;

	/** The height of the shape. */
	private _height: string;

	/** The radius of the shape. */
	private _radius: string;

	/** The second radius of the shape. */
	private _radius2: string;

	/** The color of the style. */
	private _color: string;

	/** The color of the border. */
	private _borderColor: string;

	/** The width of the border. */
	private _borderWidth: string;

	/** The font of the text. */
	private _textFont: string;

	/** The size of the text. */
	private _textSize: string;

	/** The horizontal and vertical alignment of the text. */
	private _textAlign: string;

	/** The color of the text. */
	private _textColor: string;

	/** The icon of the shape. */
	private _icon: string;

	/** The icon color of the shape. */
	private _iconColor: string;

	/** The icon size of the shape. */
	private _iconSize: string;
	
	/** The icon offset X of the shape. */
	private _iconOffsetX: string;

	/** The icon offset Y of the shape. */
	private _iconOffsetY: string;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name(): string { return this._name; }

	/** The parent of the style. */
	get parent(): string { return this._parent; }

	/** The shape of the style. */
	get shape(): string { return this.parsePropertyValue('_shape'); }
	set shape(value: string) { this._shape = value; }

	/** The width of the shape. */
	get width(): string { return this.parsePropertyValue('_width'); }
	set width(value: string) { this._width = value; }

	/** The height of the shape. */
	get height(): string { return this.parsePropertyValue('_height'); }
	set height(value: string) { this._height = value; }

	/** The radius of the shape. */
	get radius(): string { return this.parsePropertyValue('_radius'); }
	set radius(value: string) { this._radius = value; }

	/** The secondary radius of the shape. */
	get radius2(): string { return this.parsePropertyValue('_radius2'); }
	set radius2(value: string) { this._radius2 = value; }

	/** The color of the style. */
	get color(): string { return this.parsePropertyValue('_color'); }
	set color(value: string) { this._color = value; }

	/** The color of the border. */
	get borderColor(): string { return this.parsePropertyValue('_borderColor'); }
	set borderColor(value: string) { this._borderColor = value; }

	/** The width of the border. */
	get borderWidth(): string { return this.parsePropertyValue('_borderWidth'); }
	set borderWidth(value: string) { this._borderWidth = value; }

	/** The font of the text. */
	get textFont(): string { return this.parsePropertyValue('_textFont'); }
	set textFont(value: string) { this._textFont = value; }

	/** The size of the text. */
	get textSize(): string { return this.parsePropertyValue('_textSize'); }
	set textSize(value: string) { this._textSize = value; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign(): string { return this.parsePropertyValue('_textAlign'); }
	set textAlign(value: string) { this._textAlign = value; }

	/** The color of the text. */
	get textColor(): string { return this.parsePropertyValue('_textColor'); }
	set textColor(value: string) { this._textColor = value; }

	/** The icon of the shape. */
	get icon(): string { return this.parsePropertyValue('_icon'); }
	set icon(value: string) { this._icon = value; }

	/** The icon color of the style. */
	get iconColor(): string { return this.parsePropertyValue('_iconColor'); }
	set iconColor(value: string) { this._iconColor = value; }
	
	/** The icon size of the style. */
	get iconSize(): string { return this.parsePropertyValue('_iconSize'); }
	set iconSize(value: string) { this._iconSize = value; }

	/** The icon offset X of the style. */
	get iconOffsetX(): string { return this.parsePropertyValue('_iconOffsetX'); }
	set iconOffsetX(value: string) { this._iconOffsetX = value; }

	/** The icon offset X of the style. */
	get iconOffsetY(): string { return this.parsePropertyValue('_iconOffsetY'); }
	set iconOffsetY(value: string) { this._iconOffsetY = value; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data: any) {

		// Save the name and the parent of the instance
		this._name = data.name;
		this._parent = data.parent;
		this._children = [];
		if (this._parent) this._children.push(this.name);

		// Parse the initialization parameters
		if (data.shape) this.shape = data.shape;
		if (data.width) this.width = data.width;
		if (data.height) this.height = data.height;
		if (data.radius) this.radius = data.radius;
		if (data.radius2) this.radius2 = data.radius2;
		if (data.color) this.color = data.color;
		if (data.borderColor) this.borderColor = data.borderColor;
		if (data.borderWidth) this.borderWidth = data.borderWidth;
		if (data.textFont) this.textFont = data.textFont;
		if (data.textSize) this.textSize = data.textSize;
		if (data.textAlign) this.textAlign = data.textAlign;
		if (data.textColor) this.textColor = data.textColor;
		if (data.icon) this.icon = data.icon;
		if (data.iconColor) this.iconColor = data.iconColor;
		if (data.iconSize) this.iconSize = data.iconSize;
		if (data.iconOffsetX) this.iconOffsetX = data.iconOffsetX;
		if (data.iconOffsetY) this.iconOffsetY = data.iconOffsetY;
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
	 static combine(styles: Style[]) {
		if (!styles || styles.length == 0) throw Error ("No styles to combine");
		if (styles.length == 1) return styles[0];
		let combination = styles[0];
		styles.forEach(style => { combination.deserialize(style); });
		return combination
	}
}