/** Defines a visual Shape. */
export class Shape {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		this._width = data.width || 0;
		this._height = data.height || 0;
		this._path = new Path2D(data.path);
		this._color = data.color;
		this._borderColor = data.borderColor;
		this._borderWidth = data.borderWidth;
		this._children = [];
		if (data.children)
			data.children.forEach(s => { this._children.push(s); });
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

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


	// --------------------------------------------------------- PUBLIC METHODS
	/** Draws the shape.
	 * @param ctx The 2D context where to draw the shape. */
	draw(ctx, position = null, size = null) {

		// Save the current state
		ctx.save();

		// If there is a size, calculate the scale
		if (size) {
			let maxDimension = (this._width > this._height) ?
				this._width : this._height, scale = size / maxDimension;
			// Translate the relative position
			if (this._width && this._height)
				ctx.translate((-this.width * scale) / 2, (-this._height * scale) / 2);

			// Scale the object
			ctx.scale(scale, scale);

			// Position the the shape
			if (position)
				ctx.translate(position.x / scale, position.y / scale);
		}
		else if (position)
			ctx.translate(position.x, position.y);


		// Draw the path
		if (this._path) {

			// Draw the path
			ctx.fillStyle = this._color;
			ctx.fill(this._path);

			// Draw the outline
			if (this._borderColor && this._borderWidth) {
				ctx.lineWidth = parseFloat(this._borderWidth);
				ctx.strokeStyle = this._borderColor;
				ctx.stroke();
			}
		}

		// Draw the subshapes
		this._children.forEach(child => { child.draw(ctx); });

		// Restor the previous state
		ctx.restore();
	}
}

