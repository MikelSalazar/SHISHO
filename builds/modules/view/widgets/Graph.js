import { Vector } from "../../data/model/Vector.js";
import { Shape } from "../Shape.js";
import { Style } from "../../data/model/Style.js";
import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";

/** Defines a Graph. */
export class Graph extends Widget {

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The shapes of the layer. */
	// get shapes(): Shape[] { return this._shapes; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Graph class.
	 * @param name The widget name;
	 * @param parent The parent widget.*/
	constructor(name, parent) {

		// Call the base class constructor
		super(name, parent, createElement("canvas", parent.element, parent.name + "Canvas"));

		this._shapes = [];

		// Create the canvas for the layer
		this._canvas = this._element;
		this._context = this._canvas.getContext('2d');
		this._translate = new Vector();
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the widget.
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Call the base class function
		super.update(deltaTime);

		// Get the canvas properties
		let canvas = this._canvas, ctx = this._context;
		let w = canvas.width = this.parent.element.clientWidth, h = canvas.height = this.parent.element.clientHeight;

		// Clean the background of the graph
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, w, h);

		// Translate the graph
		ctx.translate(this._translate.x, this._translate.y);

		// Get the ontology data
		let o = this.parent.viewport.app.data.ontology;


		ctx.fillStyle = 'black';
		ctx.font = "16px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = "middle";

		this._shapes = [];

		for (let relationName in o.relations) {
			let r = o.relations[relationName];
			let origin = o.classes[r.origin].positions[0];
			let target = o.classes[r.target].positions[0];


			ctx.beginPath();
			ctx.moveTo(origin.x, origin.y);
			ctx.lineTo(target.x, target.y);
			ctx.stroke();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "black";
			ctx.font = "Arial 12px";
			ctx.fillText(r.name, (origin.x + target.x) / 2, (origin.y + target.y) / 2);
		}

		let style = new Style({ "name": "simple", shape: "circle", radius: "50",
			color: "white", borderWidth: "2", borderColor: "black",
			textColor: "black", textFont: "Arial", textSize: "16px"
		});


		for (let className in o.classes) {
			let c = o.classes[className];

			let shape = new Shape(c.name, c.positions[0], [style], c.name);
			this._shapes.push(shape);

			shape.draw(ctx);
		}


	}


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event) {

		switch (event.type) {
			case 'pointermove':
				let e = event;

				if (e.buttons == 1) {
					this._translate.x += e.movementX;
					this._translate.y += e.movementY;
					// console.log(e.movementX + "," + e.movementY);
				}
				break;
			case 'touchmove':
				let te = event;
				// if(te.button == 2) {
				console.log('touchmove');
				// }
				break;
		}


		return true; // Capture the event
	}
}
