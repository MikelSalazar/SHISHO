import { Node } from "../Node";
import { Color } from "../types/Color";
import { String } from "../types/String";
import { Measure } from "../types/Measure";
import { Root } from "./Root";

/** Defines a visual Style. */
export class Style extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the style. */
	private _name: String;

	/** The parent style. */
	private _parent: String;

	/** The type of shape of the style. */
	private _shape: String;

	/** The width of the shape. */
	private _width: Measure;

	/** The height of the shape. */
	private _height: Measure;

	/** The radius of the shape. */
	private _radius: Measure;

	/** The second radius of the shape. */
	private _radius2: Measure;

	/** The color of the style. */
	private _color: Color;

	/** The color of the border. */
	private _borderColor: Color;

	/** The width of the border. */
	private _borderWidth: Measure;

	/** The font of the text. */
	private _textFont: String;

	/** The size of the text. */
	private _textSize: Measure;

	/** The horizontal and vertical alignment of the text. */
	private _textAlign: String;

	/** The color of the text. */
	private _textColor: Color;

	/** The icon of the shape. */
	private _icon: String;

	/** The icon color of the shape. */
	private _iconColor: Color;

	/** The icon size of the shape. */
	private _iconSize: Measure;

	/** The icon offset X of the shape. */
	private _iconOffsetX: Measure;

	/** The icon offset Y of the shape. */
	private _iconOffsetY: Measure;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name(): String { return this._name; }

	/** The parent of the style. */
	get parent(): String { return this._parent; }

	/** The shape of the style. */
	get shape(): String { return this._shape; }

	/** The width of the shape. */
	get width(): Measure { return this._width; }

	/** The height of the shape. */
	get height(): Measure { return this._height; }

	/** The radius of the shape. */
	get radius(): Measure { return this._radius; }

	/** The secondary radius of the shape. */
	get radius2(): Measure { return this._radius2; }

	/** The color of the style. */
	get color(): Color { return this._color; }
	set color(value: Color) { this._color = value; }

	/** The color of the border. */
	get borderColor(): Color { return this._borderColor; }
	set borderColor(value: Color) { this._borderColor = value; }

	/** The width of the border. */
	get borderWidth(): Measure { return this._borderWidth; }

	/** The font of the text. */
	get textFont(): String { return this._textFont; }

	/** The size of the text. */
	get textSize(): Measure { return this._textSize; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign(): String { return this._textAlign; }

	/** The color of the text. */
	get textColor(): Color { return this._textColor; }

	/** The icon of the shape. */
	get icon(): String { return this._icon; }

	/** The icon color of the style. */
	get iconColor(): Color { return this._iconColor; }

	/** The icon size of the style. */
	get iconSize(): Measure { return this._iconSize; }

	/** The icon offset X of the style. */
	get iconOffsetX(): Measure { return this._iconOffsetX; }

	/** The icon offset X of the style. */
	get iconOffsetY(): Measure { return this._iconOffsetY; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName?: string, root?: Root, data?: any) {
				
		// Call the base class constructor
		super(nodeName || "style", root, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._parent = new String("parent", this);

		this._shape = new String("shape", this);
		this._width = new Measure("width", this);
		this._height = new Measure("height", this);
		this._radius = new Measure("radius", this);
		this._radius2 = new Measure("radius2", this);

		this._color = new Color("color", this);
		this._borderColor = new Color("border_color", this);
		this._borderWidth = new Measure("border_width", this);

		this._textFont = new String("text_font", this);
		this._textSize = new Measure("text_size", this);
		this._textAlign = new String("text_align", this);
		this._textColor = new Color("text_color", this);

		this._icon = new String("icon", this);
		this._iconColor = new Color("icon_color", this);
		this._iconSize = new Measure("icon_size", this);
		this._iconOffsetX = new Measure("icon_offset_x", this);
		this._iconOffsetY = new Measure("icon_offset_y", this);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	// --------------------------------------------------------- PUBLIC METHODS
	
	/** Deserializes the Style instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data: any = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name != undefined) this._name.deserialize(data.shape);
		if (data.parent != undefined) this._parent.deserialize(data.parent);
		if (data.shape != undefined) this._shape.deserialize(data.shape);
		if (data.width != undefined) this._width.deserialize(data.width);
		if (data.height != undefined) this._height.deserialize(data.height);
		if (data.radius != undefined) this._radius.deserialize(data.radius);
		if (data.radius2 != undefined) this._radius2.deserialize(data.radius2);
		if (data.color != undefined) this._color.deserialize(data.color);
		if (data.border_color != undefined) this._borderColor.deserialize(data.border_color);
		if (data.border_width != undefined) this._borderWidth.deserialize(data.border_width);
		if (data.text_font != undefined) this._textFont.deserialize(data.text_font);
		if (data.text_size != undefined) this._textSize.deserialize(data.text_size);
		if (data.text_align != undefined) this._textAlign.deserialize(data.text_align);
		if (data.text_color != undefined) this._textColor.deserialize(data.text_color);
		if (data.icon != undefined) this._icon.deserialize(data.icon);
		if (data.icon_color != undefined) this._iconColor.deserialize(data.icon_color);
		if (data.icon_size != undefined) this._iconSize.deserialize(data.icon_size);
		if (data.icon_offset_x != undefined) this._iconOffsetX.deserialize(data.icon_offset_x);
		if (data.icon_offset_y != undefined) this._iconOffsetY.deserialize(data.icon_offset_y);
	}


	/** Obtains the value of a property. 
	 * @param propertyName The name of the property. */
	getValue(propertyName: string): number {

		let v = this[propertyName], p = this._parent;
		// if (v == null && p !== null) return p.parsePropertyValue(propertyName);
		// if (v.endsWith())
		// return this._color || (this._parent)? this._parent.color: null; 

		return v;
	}


	/** Combines multiple styles into one.
	 * @param styles The styles to combine. */
	static combine(styles: Style[]) {
		if (!styles || styles.length == 0) throw Error("No styles to combine");
		if (styles.length == 1) return styles[0];
		let combination = new Style("style", null);
		for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
			let style = styles[styleIndex];
			let styleData = style.serialize();
			// console.log(styleData);
			combination.deserialize(styleData);
		} 
		// console.log(combination.serialize());
		return combination;
	}
}