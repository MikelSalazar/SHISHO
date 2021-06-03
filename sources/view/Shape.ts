import { Vector } from "../data/model/Vector";
import { Layer } from "./Layer";
import { Style } from "../data/model/Style";

/** Defines a visual shape. */
export class Shape {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the shape. */
	protected _name: string;

	/** The position of the shape. */
	protected _position: Vector;

	/** The styles of the shape. */
	protected _styles: Style [];

	/** The text of the shape. */
	protected _text: string;

	/** The visibility of the shape. */
	protected _visibility: number = 1;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the shape. */
	get name(): string { return this._name; }

	/** The position of the shape. */
	get position(): Vector { return this._position; }

	/** The Layer instance the shape belongs to. */
	get styles(): Style [] { return this._styles; }

	/** The text of the shape. */
	get text(): string { return this._text; }

	/** The visibility of the shape. */
	get visibility(): number { return this._visibility; }
	

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Shape class.
	 * @param name The name of the shape.
	 * @param layer The Layer instance the shape belongs to.
	 * @param styles The styles of the shape.
	 * @param text The text of the shape.
	 * @param icon The icon of the shape. */
	constructor (name:string, position: Vector, styles: Style[] = null, 
		text: string = null, icon: string = null){

		this._name = name; 
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text; 
	}

	
	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual shape. */
	draw(ctx: CanvasRenderingContext2D) {

		let s = this._styles[0];
		let p = this._position;

		ctx.beginPath();
		switch(s.shape) {
			case "circle":
				if(s.radius == undefined) throw Error("No radius defined");
				let r = parseFloat(s.radius);
				ctx.arc(p.x, p.y, r, 0, 2* Math.PI);
				break;
			case "rectangle":
				break;
			default: throw Error("Invalid Shape Type"); break;
		}

		if (s.color) { ctx.fillStyle = s.color; ctx.fill(); }
		if (s.borderColor && s.borderWidth) { 
			ctx.lineWidth = parseFloat(s.borderWidth)
			ctx.strokeStyle = s.borderColor; ctx.stroke(); 
		}
		if (s.textColor && s.textFont) { 
			ctx.textAlign = "center"; ctx.textBaseline = "middle";
			ctx.fillStyle = s.textColor; ctx.font = s.textSize + " " + s.textFont;
			ctx.fillText(this._text,p.x,p.y);
		}
	
	}

	/** Finds if a point is inside the Shape */
	isInside(point: Vector): boolean {
		return false;
	}
}