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


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name(): string { return this._name; }

	/** The parent of the style. */
	get parent(): string { return this._parent; }

	/** The shape of the style. */
	get shape(): string { return this.parsePropertyValue('_shape'); }
	set shape(shape: string) { this._shape = shape; }

	/** The width of the shape. */
	get width(): string { return this.parsePropertyValue('_width'); }
	set width(width: string) { this._width = width; }

	/** The height of the shape. */
	get height(): string { return this.parsePropertyValue('_height'); }
	set height(height: string) { this._height = height; }

	/** The radius of the shape. */
	get radius(): string { return this.parsePropertyValue('_radius'); }
	set radius(radius: string) { this._radius = radius; }

	/** The secondary radius of the shape. */
	get radius2(): string { return this.parsePropertyValue('_radius2'); }
	set radius2(radius2: string) { this._radius2 = radius2; }

	/** The color of the style. */
	get color(): string { return this.parsePropertyValue('_color'); }
	set color(color: string) { this._color = color; }

	/** The color of the border. */
	get borderColor(): string { return this.parsePropertyValue('_borderColor'); }
	set borderColor(color: string) { this._borderColor = color; }

	/** The width of the border. */
	get borderWidth(): string { return this.parsePropertyValue('_borderWidth'); }
	set borderWidth(width: string) { this._borderWidth = width; }

	/** The font of the text. */
	get textFont(): string { return this.parsePropertyValue('_textFont'); }
	set textFont(fontName: string) { this._textFont = fontName; }

	/** The size of the text. */
	get textSize(): string { return this.parsePropertyValue('_textSize'); }
	set textSize(size: string) { this._textSize = size; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign(): string { return this.parsePropertyValue('_textAlign'); }
	set textAlign(align: string) { this._textAlign = align; }

	/** The color of the text. */
	get textColor(): string { return this.parsePropertyValue('_textColor'); }
	set textColor(color: string) { this._textColor = color; }


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