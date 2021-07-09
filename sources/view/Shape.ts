/** Defines a visual Shape. */
export class Shape {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The width of the shape. */
	private _width: number;

	/** The height of the shape. */
	private _height: number;

	/** The SVG path of the shape. */
	private _path: Path2D;

	/** The subshapes of the shape. */
	private _children: Shape[];

	/** The color of the shape. */
	private _color: string;

	/** The color of the shape border. */
	private _borderColor: string;

	/** The width of the shape border. */
	private _borderWidth: string;


	// ------------------------------------------------------ PUBLIC PROPERTIES

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
	get borderWidth(): string { return this._borderWidth; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data: any = {}) {
		this._width = data.width || 0;
		this._height = data.height || 0;
		this._path = new Path2D(data.path); 
		this._color = data.color;
		this._borderColor = data.borderColor;
		this._borderWidth = data.borderWidth;
		this._children = [];
		if (data.children)
			data.children.forEach(s => { this._children.push(s)});
	}


	// --------------------------------------------------------- PUBLIC METHODS
	/** Draws the shape.
	 * @param ctx The 2D context where to draw the shape. */
	draw(ctx: CanvasRenderingContext2D, position = null, size = null) {

		// Save the current state
		ctx.save();

		// If there is a size, calculate the scale
		if (size) {
			let maxDimension = (this._width > this._height) ?
				this._width : this._height, scale = size / maxDimension;
			// Translate the relative position
			if (this._width && this._height) ctx.translate(
				(-this.width * scale)/2, (-this._height * scale)/2);

			// Scale the object
			ctx.scale(scale, scale);

			// Position the the shape
			if (position) ctx.translate(position.x / scale, position.y / scale);
		}
		else if (position) ctx.translate(position.x, position.y);
		

		// Draw the path
		if (this._path) {
			
			// Draw the path
			ctx.fillStyle = this._color; 
			ctx.fill(this._path);

			// Draw the outline
			if (this._borderColor && this._borderWidth) { 
				ctx.lineWidth = parseFloat(this._borderWidth)
				ctx.strokeStyle = this._borderColor; ctx.stroke(); 
			}
		}

		// Draw the subshapes
		this._children.forEach(child => { child.draw(ctx); });

		// Restor the previous state
		ctx.restore();
	}
}
