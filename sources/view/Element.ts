import { Vector } from "../data/types/Vector";
import { Style } from "../data/model/Style";
import { SHISHO } from "../SHISHO";
import { Shape } from "./Shape";

/** Defines a visual Element. */
export class Element {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the element. */
	protected _name: string;

	/** The position of the element. */
	protected _position: Vector;

	/** The styles of the element. */
	protected _styles: Style [];

	/** The text of the element. */
	protected _text: string;

	/** The icon of the element. */
	protected _icon: string;

	/** The visibility of the element. */
	protected _visibility: number = 1;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the element. */
	get name(): string { return this._name; }

	/** The position of the element. */
	get position(): Vector { return this._position; }

	/** The Layer instance the element belongs to. */
	get styles(): Style [] { return this._styles; }

	/** The text of the element. */
	get text(): string { return this._text; }

	/** The icon of the element. */
	get icon(): string { return this._icon; }

	/** The visibility of the element. */
	get visibility(): number { return this._visibility; }
	

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the element class.
	 * @param name The name of the element.
	 * @param layer The Layer instance the element belongs to.
	 * @param styles The styles of the element.
	 * @param text The text of the element.
	 * @param icon The icon of the element. */
	constructor (name:string, position: Vector, styles: Style[] = null, 
		text: string = null, icon: string = null){

		this._name = name; 
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text; 
		this._icon = icon; 
	}

	
	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual element. */
	draw(ctx: CanvasRenderingContext2D) {

		// Save the current state
		ctx.save(); 
		
		let s = Style.combine(this._styles); let p = this._position;

		ctx.beginPath();
		switch(s.shape) {
			case "circle":
				if(s.radius == undefined) throw Error("No radius defined");
				let r = parseFloat(s.radius);
				ctx.arc(p.x, p.y, r, 0, 2* Math.PI);
				break;
			case "rectangle":
				break;
			// default: throw Error("Invalid element Type"); break;
		}

		if (s.color) { ctx.fillStyle = s.color; ctx.fill(); }
		if (s.borderColor && s.borderWidth) { 
			ctx.lineWidth = parseFloat(s.borderWidth)
			ctx.strokeStyle = s.borderColor; ctx.stroke(); 
		}
		if (this._text && s.textColor && s.textFont) { 
			ctx.textAlign = "center"; ctx.textBaseline = "middle";
			ctx.fillStyle = s.textColor; ctx.font = s.textSize + " " + s.textFont;
			ctx.fillText(this._text,p.x,p.y);
		}
		if (this._icon) { 
			if (s.iconColor) ctx.fillStyle = s.iconColor;
			if (s.iconOffsetX) ctx.translate(parseFloat(s.iconOffsetX), 0);
			if (s.iconOffsetY) ctx.translate(0, parseFloat(s.iconOffsetY));
			if(SHISHO.resources[this._icon]) {
				(SHISHO.resources[this._icon] as Shape).draw(ctx, p, parseFloat(s.iconSize));
			} else throw Error ("Unknow Icon: " + this._icon);
		}

		// Restore the previous  state
		ctx.restore(); 
	}

	/** Finds if a point is inside the element */
	isInside(point: Vector): boolean {
		return false;
	}
}