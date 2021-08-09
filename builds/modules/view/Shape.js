/** Defines a visual Shape. */
export class Shape {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		this._x = data.x || 0;
		this._y = data.y || 0;
		this._width = data.width || 0;
		this._height = data.height || 0;
		this._path = new Path2D(data.path);
		this._text = data.text;
		this._font = data.font;
		this._color = data.color;
		this._borderColor = data.borderColor;
		this._borderWidth = data.borderWidth;
		this._children = [];
		if (data.children)
			data.children.forEach(s => { this._children.push(s); });
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The width of the shape. */
	get x() { return this._x; }

	/** The height of the shape. */
	get y() { return this._y; }

	/** The width of the shape. */
	get width() { return this._width; }

	/** The height of the shape. */
	get height() { return this._height; }

	/** The SVG path of the border. */
	get path() { return this._path; }

	/** The color of the shape. */
	get color() { return this._color; }

	/** The color of the border. */
	get borderColor() { return this._borderColor; }

	/** The width of the border. */
	get borderWidth() { return this._borderWidth; }

	/** The sub-shapes of the shape. */
	get children() { return this._children; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the shape.
	 * @param ctx The 2D context where to draw the shape. */
	draw(ctx, position = null, size = null) {

		// Save the current state
		ctx.save();

		ctx.translate(this._x, this.y);
		if (position)
			ctx.translate(position.x.get(), position.y.get());

		// If there is a size, calculate the scale
		if (size) {
			let maxDimension = (this._width > this._height) ?
				this._width : this._height, scale = size / maxDimension;
			// Translate the relative position
			if (this._width && this._height)
				ctx.translate((-this.width * scale) / 2, (-this._height * scale) / 2);

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
				ctx.strokeStyle = this._borderColor;
				ctx.stroke(this._path);
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

