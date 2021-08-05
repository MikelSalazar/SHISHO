import { Ontology } from "../../data/model/Ontology";
import { Vector } from "../../data/types/Vector";
import { Layer } from "../Layer";
import { Element } from "../Element";
import { Style } from "../../data/model/Style";
import { createElement } from "../Viewport";
import { Widget } from "../Widget";

/** Defines a Graph. */
export class Graph extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The canvas element. */
	private _canvas: HTMLCanvasElement;

	/** The context of the canvas element. */
	private _context: CanvasRenderingContext2D;

	/** The translation vector. */
	private _translateX = 0;

	private _translateY = 0;

	/** The zoom level. */
	private _zoom: number = 0;

	/** The scale factor. */
	private _scale: number = 1;

	/** The elements to draw. */
	private _elements: Record<string, Element> = {};

	private _basicStyle: Style;

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The elements of the layer. */
	// get elements(): Element[] { return this._elements; }

	set zoom(value: number) { 

	}

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Graph class.
	 * @param name The widget name;
	 * @param parent The parent widget.*/
	constructor(name:string, parent:Widget) {

		// Call the base class constructor
		super(name, parent, createElement("canvas", parent.element, 
			parent.name + "Canvas"));

		// Create the canvas for the layer
		this._canvas = this._element as HTMLCanvasElement;
		this._context = this._canvas.getContext('2d');

		this._basicStyle = new Style(null, null, {"name": "simple", 
			shape: "circle", radius: "50", 
			color: [255,255,255], border_width:"2", border_color: [0,0,255],
			text_color: [0,0,0], text_font: "Arial", text_size: "16px"
		});

	}

	
	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the widget. 
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Call the base class function
		super.update(deltaTime);

		// return; // TEMPORAL

		// Get the canvas properties
		let canvas = this._canvas, ctx = this._context; 
		let w = canvas.width = this.parent.element.clientWidth, 
			h = canvas.height = this.parent.element.clientHeight;
		
		// Clean the background of the graph
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, w, h);

		// Translate and scale the graph
		ctx.translate(w/2,h/2);
		ctx.scale(this._scale, this._scale);
		ctx.translate(this._translateX, this._translateY);

		// DEBUG: Draw the origin point
		ctx.strokeStyle = 'red';
		let os = 10;
		ctx.strokeRect(-os/2,os/2,os,os);

		// Get the ontology data
		let o : Ontology = (this.parent as Layer ).viewport.app.data.ontology;
		if (!o) return;

		ctx.fillStyle = 'black'; ctx.font = "16px Arial";
		ctx.textAlign = 'center'; ctx.textBaseline = "middle";

		// Draw the connectors for the realtionships
		for (const relation of o.relations.children) {
			let origin = o.classes[relation.origin.value].positions.children[0];
			let target = o.classes[relation.target.value].positions.children[0];

			ctx.strokeStyle = 'grey';
			ctx.beginPath();
			ctx.moveTo(origin.x, origin.y);
			ctx.lineTo(target.x, target.y);
			ctx.stroke();
			ctx.fillStyle = "black";
			ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "Arial 12px";
			ctx.fillText(relation.name.value, (origin.x + target.x)/2,(origin.y + target.y)/2);
		}
		
		// Create the elements to draw
		this._elements = {};
		for (const c of o.classes.children) {
			let className = c.name.value;
			let element = new Element(className, c.positions.children[0], 
				[this._basicStyle], className);
			this._elements[className] = element;
			element.draw(ctx);
		}

	}


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event:Event): boolean {

		switch(event.type) {
			case 'pointermove':
				let pointerEvent = event as PointerEvent;
				if(pointerEvent.buttons == 1 || pointerEvent.buttons == 2) {
					this._translateX += pointerEvent.movementX / this._scale;
					this._translateY += pointerEvent.movementY / this._scale;
					// console.log(e.movementX + "," + e.movementY);
				}
			break;
			case 'wheel':
				let wheelEvent = event as WheelEvent;

				// Get the point where the user is performing the action
				let c = this._canvas, w = c.width, h = c.height, 
					x = wheelEvent.clientX - w/2, y = wheelEvent.clientY - h/2,
					previousScale = this._scale;

				// Calculate the new zoom level and scale factor
				let zoomDelta = ((wheelEvent.deltaY < 0)? 1 :-1);
				this._zoom += zoomDelta;
				this._scale = Math.pow(1.5, this._zoom)
				console.log('Zoom: ' + (this._scale * 100).toFixed(0) + '%');

				// Transform the location between both scales
				this._translateX += -x / previousScale + x / this._scale; 
				this._translateY += -y / previousScale + y / this._scale; 

			break;

			case 'touchmove':
				let te = event as TouchEvent;
				// if(te.button == 2) {
					console.log('touchmove')
				// }
			break;

			case 'dblclick':
				alert("[TODO: Show description of element here]");
			break;
			
			// If it is not one of those do not capture the event
			default: return false;
		}
		// Capture the event
		return true; 
	}
}