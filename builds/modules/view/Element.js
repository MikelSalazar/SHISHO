import { Vector } from "../data/model/Vector.js";
import { Style } from "../data/model/Style.js";
import { SHISHO } from "../SHISHO.js";

/** Defines a visual Element. */
export class Element {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the element class.
	 * @param name The name of the element.
	 * @param layer The Layer instance the element belongs to.
	 * @param styles The styles of the element.
	 * @param text The text of the element.
	 * @param icon The icon of the element. */
	constructor(name, position, styles = null, text = null, icon = null) {

		/** The visibility of the element. */
		this._visibility = 1;

		this._name = name;
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text;
		this._icon = icon;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the element. */
	get name() { return this._name; }

	/** The position of the element. */
	get position() { return this._position; }

	/** The Layer instance the element belongs to. */
	get styles() { return this._styles; }

	/** The text of the element. */
	get text() { return this._text; }

	/** The icon of the element. */
	get icon() { return this._icon; }

	/** The visibility of the element. */
	get visibility() { return this._visibility; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual element. */
	draw(ctx) {

		// Save the current state
		ctx.save();

		let s = Style.combine(this._styles);
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
			// default: throw Error("Invalid element Type"); break;
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
		if (this._text && s.textColor && s.textFont) {
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = s.textColor;
			ctx.font = s.textSize + " " + s.textFont;
			ctx.fillText(this._text, p.x, p.y);
		}
		if (this._icon) {
			if (s.iconColor)
				ctx.fillStyle = s.iconColor;
			if (s.iconOffsetX)
				ctx.translate(parseFloat(s.iconOffsetX), 0);
			if (s.iconOffsetY)
				ctx.translate(0, parseFloat(s.iconOffsetY));
			if (SHISHO.resources[this._icon]) {
				SHISHO.resources[this._icon].draw(ctx, p, parseFloat(s.iconSize));
			}
			else
				throw Error("Unknow Icon: " + this._icon);
		}

		// Restore the previous  state
		ctx.restore();
	}

	/** Finds if a point is inside the element */
	isInside(point) {
		return false;
	}
}
