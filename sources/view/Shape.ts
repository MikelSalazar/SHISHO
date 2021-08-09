/** Defines a visual Shape. */
export class Shape {

	// ------------------------------------------------------- PROTECTED FIELDS

	/** The x position of the shape. */
	protected _x: number;

	/** The y position of the shape. */
	protected _y: number;

	/** The width of the shape. */
	protected _width: number;

	/** The height of the shape. */
	protected _height: number;

	/** The SVG path of the shape. */
	protected _path: Path2D;

	/** The text of the shape. */
	protected _text: string;

	/** The text font of the shape. */
	protected _font: string;

	/** The color of the shape. */
	protected _color: string;

	/** The color of the shape border. */
	protected _borderColor: string;

	/** The width of the shape border. */
	protected _borderWidth: number;

	/** The sub-shapes of the shape. */
	protected _children: Shape[];


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The width of the shape. */
	get x(): number { return this._x; }

	/** The height of the shape. */
	get y(): number { return this._y; }
	
	/** The width of the shape. */
	get width(): number { return this._width; }

	/** The height of the shape. */
	get height(): number { return this._height; }

	/** The SVG path of the border. */
	get path(): Path2D { return this._path; }

	/** The color of the shape. */
	get color(): string { return this._color; }

	/** The color of the border. */
	get borderColor(): string { return this._borderColor; }

	/** The width of the border. */
	get borderWidth(): number { return this._borderWidth; }

	/** The sub-shapes of the shape. */
	get children (): Shape[] { return this._children; }

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) {
		this._x = data.x || 0; this._y = data.y || 0;
		this._width = data.width || 0; this._height = data.height || 0;
		this._path = new Path2D(data.path);
		this._text = data.text;
		this._font = data.font;
		this._color = data.color;
		this._borderColor = data.borderColor;
		this._borderWidth = data.borderWidth;
		this._children = [];
		if (data.children)
			data.children.forEach(s => { this._children.push(s) });
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the shape.
	 * @param ctx The 2D context where to draw the shape. */
	draw(ctx: CanvasRenderingContext2D, position = null, size = null) {

		// Save the current state
		ctx.save();

		ctx.translate(this._x, this.y);
		if (position) ctx.translate(position.x.get(), position.y.get());

		// If there is a size, calculate the scale
		if (size) {
			let maxDimension = (this._width > this._height) ?
				this._width : this._height, scale = size / maxDimension;
			// Translate the relative position
			if (this._width && this._height) ctx.translate(
				(-this.width * scale) / 2, (-this._height * scale) / 2);

			// Scale the object
			ctx.scale(scale, scale);
		}


		// Draw the path
		if (this._path) {

			// Draw the path
			ctx.fillStyle = this._color;
			ctx.fill(this._path);

			// Draw the outline
			if (this._borderColor && this._borderWidth) {
				ctx.lineWidth = this._borderWidth;
				ctx.strokeStyle = this._borderColor; ctx.stroke(this._path);
			}
		}

		// Draw the text
		if (this._text) {

			// Draw the path
			ctx.fillStyle = this._color;
			ctx.fillText(this._text, 0, 0);
		}

		// Draw the subshapes
		this._children.forEach(child => { child.draw(ctx); });

		// Restore the previous state
		ctx.restore();
	}
}
