import { Vector } from "../../data/model/Vector";
import { Layer } from "../Layer";
import { Shape } from "../Shape";
import { Style } from "../../data/model/Style";
import { Viewport } from "../Viewport";


/** Displays the menus of the app. */
export class MenuLayer extends Layer {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The canvas element. */
	private _canvas: HTMLCanvasElement;

	/** The context of the canvas element. */
	private _context: CanvasRenderingContext2D;

	/** The shapes of the layer. */
	protected _shapes : Shape[] = [];


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The canvas element. */
	get canvas(): HTMLCanvasElement { return this._canvas; }

	/** The shapes of the layer. */
	get shapes(): Shape[] { return this._shapes; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the MenuLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor (viewport: Viewport) {

		// Call the base class constructor
		super("Menu", viewport, "canvas");

		// Create the canvas for the layer
		this._canvas = this._element as HTMLCanvasElement;
	
		this._context = this._canvas.getContext('2d');

		// Create 
		let style = new Style({name: "test", shape:"circle", color:"blue", radius:"128"} );
		this._shapes.push(new Shape("a", new Vector({x:0,y:0}), [style]));
		this._shapes.push(new Shape("b", new Vector({x:0,y:0}), [style]));
		this._shapes.push(new Shape("c", new Vector({x:0,y:0}), [style]));
		this._shapes.push(new Shape("d", new Vector({x:0,y:0}), [style]));
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer. 
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Call the base class function
		super.update(deltaTime);

		let canvas = this._canvas, ctx = this._context; 
		let w = canvas.width = this._viewport.width, 
			h = canvas.height = this._viewport.height;

		// Clean the canvas
		ctx.clearRect(0,0,w,h);


		this._shapes[0].position.set(64,64);
		this._shapes[1].position.set(w-64,64);
		this._shapes[2].position.set(64,h-64);
		this._shapes[3].position.set(w-64,h-64);
		

		// Draw the shapes
		let shapeIndex, shapeCount = this._shapes.length;
		for (shapeIndex = 0; shapeIndex < shapeCount; shapeIndex++) {
			this._shapes[shapeIndex].draw(ctx);
		}
		

		// ctx.fillStyle = 'red';
		// ctx.fillRect(50,50,w/2,h/2);
	}

	// handleEvent(event: any) {

	// 	let cursor = new Vector({x: event.clientX, y: event.clientY});
	// 	// Travel the array of shapes in reverse
	// 	let shapeIndex, shapeCount = this._shapes.length;
	// 	for (shapeIndex = shapeCount - 1; shapeIndex >= 0; shapeIndex--) {
	// 		let shape = this._shapes[shapeIndex];
	// 		if (shape.isInside(cursor)) {

	// 		}
	// 	}
	// }

}