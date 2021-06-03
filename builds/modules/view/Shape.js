import { Vector } from "../data/model/Vector.js";

/** Defines a visual shape. */
export class Shape {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Shape class.
	 * @param name The name of the shape.
	 * @param layer The Layer instance the shape belongs to.
	 * @param styles The styles of the shape.
	 * @param text The text of the shape.
	 * @param icon The icon of the shape. */
	constructor(name, position, styles = null, text = null, icon = null) {

		/** The visibility of the shape. */
		this._visibility = 1;

		this._name = name;
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the shape. */
	get name() { return this._name; }

	/** The position of the shape. */
	get position() { return this._position; }

	/** The Layer instance the shape belongs to. */
	get styles() { return this._styles; }

	/** The text of the shape. */
	get text() { return this._text; }

	/** The visibility of the shape. */
	get visibility() { return this._visibility; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual shape. */
	draw(ctx) {

		let s = this._styles[0];
		let p = this._position;

		ctx.beginPath();
		switch (s.shape) {
			case "circle":
				if (s.radius == undefined)
					throw Error("No radius defined");
				let r = parseFloat(s.radius);
				ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
				break;
			case "rectangle":
				break;
			default:
				throw Error("Invalid Shape Type");
				break;
		}

		if (s.color) {
			ctx.fillStyle = s.color;
			ctx.fill();
		}
		if (s.borderColor && s.borderWidth) {
			ctx.lineWidth = parseFloat(s.borderWidth);
			ctx.strokeStyle = s.borderColor;
			ctx.stroke();
		}
		if (s.textColor && s.textFont) {
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = s.textColor;
			ctx.font = s.textSize + " " + s.textFont;
			ctx.fillText(this._text, p.x, p.y);
		}

	}

	/** Finds if a point is inside the Shape */
	isInside(point) {
		return false;
	}
}
