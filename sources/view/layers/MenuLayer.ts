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
	protected _elements: Element[] = [];


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The canvas element. */
	get canvas(): HTMLCanvasElement { return this._canvas; }

	/** The elements of the layer. */
	get elements(): Element[] { return this._elements; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the MenuLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport: Viewport) {

		// Call the base class constructor
		super("Menu", viewport, "canvas");

		// Create the canvas for the layer
		this._canvas = this._element as HTMLCanvasElement;

		this._context = this._canvas.getContext('2d');

		// Create 
		let style = new Style("test", null, {
			name: "test", shape: "circle",	color: [0, 128, 255],
			radius: 128, icon_color: [255, 255, 255], icon_size: 160
		});
		this._elements.push(new Element("a", new Vector("p", null, { x: 0, y: 0 }), [style,
			new Style(null, null, { icon_offset_x: 32, icon_offset_y: 32 })], null, "App"));
			this._elements.push(new Element("b", new Vector("p", null,{x:0,y:0}), [style,
				new Style(null, null, { icon_offset_x:-32, icon_offset_y:32})], null, "Options"));
			this._elements.push(new Element("c", new Vector("p", null,{x:0,y:0}), [style,
				new Style(null, null, { icon_offset_x:32, icon_offset_y:-32})], null, "Test"));
			this._elements.push(new Element("d", new Vector("p", null,{x:0,y:0}), [style]));
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer. 
	 * @param deltaTime The time since the last call.
 	 * @param forced Indicates wheter to force the update or not. */
	update(deltaTime, forced = false) {

		// return; // TEMPORAL

		let canvas = this._canvas, ctx = this._context;
		let w = canvas.width = this._viewport.width,
			h = canvas.height = this._viewport.height;


		// Clean the canvas
		ctx.clearRect(0, 0, w, h);


		this._elements[0].position.set(64, 64);
		this._elements[1].position.set(w-64,64);
		this._elements[2].position.set(64,h-64);
		this._elements[3].position.set(w-64,h-64);


		// Draw the elements
		let elementIndex, elementCount = this._elements.length;
		for (elementIndex = 0; elementIndex < elementCount; elementIndex++) {
			this._elements[elementIndex].draw(ctx);
		}

		// Call the base class function
		super.update(deltaTime);
	}
}