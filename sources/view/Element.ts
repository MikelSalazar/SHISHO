
import { Style } from "../data/model/Style";
import { Vector } from "../data/types/complex/Vector";
import { SHISHO } from "../SHISHO";
import { Shape } from "./Shape";
import { Circle } from "./shapes/Circle";

/** Defines a visual Element. */
export class Element {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The name of the element. */
	protected _name: string;

	/** The position of the element. */
	protected _position: Vector;

	/** The styles of the element. */
	protected _styles: Style[];

	/** The icon of the element. */
	protected _shape: Shape;

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
	get styles(): Style[] { return this._styles; }

	/** The background shapes of the element. */
	get shape(): Shape { return this._shape; }

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
	constructor(name: string, position: Vector, styles: Style[] = null,
		text: string = null, icon: string = null) {

		this._name = name;
		this._position = position || new Vector("position");
		this._styles = styles || [];
		this._text = text;
		this._icon = icon;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual element. */
	draw(ctx: CanvasRenderingContext2D) {

		// Get the style to apply
		let s = Style.combine(this._styles); let p = this._position;

		// Save the current state
		ctx.save();

		// Calculate the size of the text
		let textShapes: Shape[] = [], textWidth = 0, textHeight = 0;
		if (this._text && s.textFont) {
			ctx.font = s.textSize.get() + " " + s.textFont.value;
			let lines = this._text.split('\n'), lineCount = lines.length,
				lineHeight = s.textSize.get(), lineSep = lineHeight * 0.5;
				textHeight = lineHeight * lineCount ;


			for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
				let line = lines[lineIndex];
				let m = ctx.measureText(line);
				if (textWidth < m.width) textWidth = m.width;

				textShapes.push(new Shape({
					text: line, x: 0, y: (lineHeight * lineIndex) - textHeight / 2 + lineHeight/2}));
			}
		}

		// Create the background shape
		if (!this._shape) {
			switch (s.shape.value) {
				case "circle":
					this._shape = new Circle({x: 0, y: 0, 
						radius: s.radius.get(), color: s.color.toString(),
						borderColor: s.borderColor.toString(),
						borderWidth: s.borderWidth.get()});
					break;
			}
		}
		if (!this._shape) return;
		this._shape.draw(ctx, p);

		// Draw the icon
		if (this._icon) {
			// console.log(s.serialize());
			if (s.iconColor) ctx.fillStyle = s.iconColor.toString();
			if (s.iconOffsetX) ctx.translate(s.iconOffsetX.get(), 0);
			if (s.iconOffsetY) ctx.translate(0, s.iconOffsetY.get());
			if (SHISHO.resources[this._icon]) {
				(SHISHO.resources[this._icon] as Shape).draw(ctx, p, s.iconSize.get());
			} else throw Error("Unknown Icon: " + this._icon);
		}

		// Draw the texts
		for (const textShape of textShapes) {
			if (s.textColor) ctx.fillStyle = s.textColor.toString();
			ctx.textAlign = "center"; ctx.textBaseline = "middle";
			textShape.draw(ctx, p);
		}

		// Restore the previous state
		ctx.restore();
	}

	/** Finds if a point is inside the element */
	isInside(x: number, y: number): boolean {
		return false;
	}
}