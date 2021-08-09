import { Node } from "../Node";
import { String } from "../types/String";
import { Color } from "../types/complex/Color";
import { Distance } from "../types/measures/Distance";
import { Size } from "../types/measures/Size";
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
	private _width: Distance;

	/** The height of the shape. */
	private _height: Distance;

	/** The radius of the shape. */
	private _radius: Distance;

	/** The second radius of the shape. */
	private _radius2: Distance;

	/** The color of the style. */
	private _color: Color;

	/** The color of the border. */
	private _borderColor: Color;

	/** The width of the border. */
	private _borderWidth: Distance;

	/** The font of the text. */
	private _textFont: String;

	/** The size of the text. */
	private _textSize: Distance;

	/** The horizontal and vertical alignment of the text. */
	private _textAlign: String;

	/** The color of the text. */
	private _textColor: Color;

	/** The icon of the shape. */
	private _icon: String;

	/** The icon color of the shape. */
	private _iconColor: Color;

	/** The icon size of the shape. */
	private _iconSize: Distance;

	/** The icon offset X of the shape. */
	private _iconOffsetX: Distance;

	/** The icon offset Y of the shape. */
	private _iconOffsetY: Distance;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name(): String { return this._name; }

	/** The parent of the style. */
	get parent(): String { return this._parent; }

	/** The shape of the style. */
	get shape(): String { return this._shape; }

	/** The width of the shape. */
	get width(): Size { return this._width; }

	/** The height of the shape. */
	get height(): Size { return this._height; }

	/** The radius of the shape. */
	get radius(): Size { return this._radius; }

	/** The secondary radius of the shape. */
	get radius2(): Size { return this._radius2; }

	/** The color of the style. */
	get color(): Color { return this._color; }
	set color(value: Color) { this._color = value; }

	/** The color of the border. */
	get borderColor(): Color { return this._borderColor; }
	set borderColor(value: Color) { this._borderColor = value; }

	/** The width of the border. */
	get borderWidth(): Size { return this._borderWidth; }

	/** The font of the text. */
	get textFont(): String { return this._textFont; }

	/** The size of the text. */
	get textSize(): Size { return this._textSize; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign(): String { return this._textAlign; }

	/** The color of the text. */
	get textColor(): Color { return this._textColor; }

	/** The icon of the shape. */
	get icon(): String { return this._icon; }

	/** The icon color of the style. */
	get iconColor(): Color { return this._iconColor; }

	/** The icon size of the style. */
	get iconSize(): Size { return this._iconSize; }

	/** The icon offset X of the style. */
	get iconOffsetX(): Distance { return this._iconOffsetX; }

	/** The icon offset X of the style. */
	get iconOffsetY(): Distance { return this._iconOffsetY; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName?: string, root?: Root, data?: any) {
				
		// Call the base class constructor
		super("style", nodeName, root, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._nodeParent = new String("parent", this);

		this._shape = new String("shape", this);
		this._width = new Size("width", this);
		this._height = new Size("height", this);
		this._radius = new Size("radius", this);
		this._radius2 = new Size("radius2", this);

		this._color = new Color("color", this);
		this._borderColor = new Color("border_color", this);
		this._borderWidth = new Size("border_width", this);

		this._textFont = new String("text_font", this);
		this._textSize = new Size("text_size", this);
		this._textAlign = new String("text_align", this);
		this._textColor = new Color("text_color", this);

		this._icon = new String("icon", this);
		this._iconColor = new Color("icon_color", this);
		this._iconSize = new Size("icon_size", this);
		this._iconOffsetX = new Distance("icon_offset_x", this);
		this._iconOffsetY = new Distance("icon_offset_y", this);

		// Deserialize the initialization data
		if (data != undefined) this.deserialize(data);
	}


	/** Obtains the value of a property. 
	 * @param propertyName The name of the property. */
	getValue(propertyName: string): number {

		let v = this[propertyName], p = this._nodeParent;
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