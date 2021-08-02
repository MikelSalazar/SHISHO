import { Vector } from "../../data/types/Vector";
import { Layer } from "../Layer";
import { Element } from "../Element";
import { Style } from "../../data/model/Style";
import { Viewport } from "../Viewport";


/** Displays the menus of the app. */
export class MenuLayer extends Layer {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The canvas element. */
	private _canvas: HTMLCanvasElement;

	/** The context of the canvas element. */
	private _context: CanvasRenderingContext2D;

	/** The elements of the layer. */
	protected _elements : Element[] = [];


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The canvas element. */
	get canvas(): HTMLCanvasElement { return this._canvas; }

	/** The elements of the layer. */
	get elements(): Element[] { return this._elements; }


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
		let style = new Style({name: "test", shape:"circle", color:"blue", 
			radius:"128", iconColor:"white", iconSize:"160"} );
		this._elements.push(new Element("a", new Vector({x:0,y:0}), [style,
			new Style({ iconOffsetX:"32", iconOffsetY:"32"})], null, "App"));
		this._elements.push(new Element("b", new Vector({x:0,y:0}), [style,
			new Style({ iconOffsetX:"-32", iconOffsetY:"32"})], null, "Options"));
		this._elements.push(new Element("c", new Vector({x:0,y:0}), [style,
			new Style({ iconOffsetX:"32", iconOffsetY:"-32"})], null, "Test"));
		this._elements.push(new Element("d", new Vector({x:0,y:0}), [style]));
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


		this._elements[0].position.set(64,64);
		this._elements[1].position.set(w-64,64);
		this._elements[2].position.set(64,h-64);
		this._elements[3].position.set(w-64,h-64);
		

		// Draw the elements
		let elementIndex, elementCount = this._elements.length;
		for (elementIndex = 0; elementIndex < elementCount; elementIndex++) {
			this._elements[elementIndex].draw(ctx);
		}
		

		// ctx.fillStyle = 'red';
		// ctx.fillRect(50,50,w/2,h/2);
	}
}