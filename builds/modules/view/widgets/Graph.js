import { Vector } from "../../data/types/Vector.js";
import { Element } from "../Element.js";
import { Style } from "../../data/model/Style.js";
import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";

/** Defines a Graph. */
export class Graph extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Graph class.
	 * @param name The widget name;
	 * @param parent The parent widget.*/
	constructor(name, parent) {

		// Call the base class constructor
		super(name, parent, createElement("canvas", parent.element, parent.name + "Canvas"));

		/** The horizontal position of the virtual camera. */
		this._x = 0;

		/** The vertical position of the virtual camera. */
		this._y = 0;

		/** The zoom factor of the virtual camera. */
		this._zoom = 1;

		/** The zoom level of the virtual camera. */
		this._zoomLevel = 0;

		/** The elements of the graph. */
		this._elements = {};

		// Create the canvas for the layer
		this._canvas = this._element;
		this._context = this._canvas.getContext('2d');

		this._basicStyle = new Style(null, null, {
			"name": "simple",
			shape: "circle", radius: "50",
			color: [255, 255, 255], border_width: "2", border_color: [0, 0, 255],
			text_color: [0, 0, 0], text_font: "Arial", text_size: "16px"
		});

	}


	// ------------------------------------------------------ PUBLIC PROPERTIES


	/** The horizontal position of the virtual camera. */
	get x() { return this._x; }
	set x(value) { this._x = value; this.updated = false; }

	/** The vertical position of the virtual camera. */
	get y() { return this._y; }
	set y(value) { this._y = value; this.updated = false; }

	/** The zoom factor of the virtual camera. */
	get zoom() { return this._zoom; }
	set zoom(value) { this._zoom = value; this.updated = false; }

	/** The zoom level of the virtual camera. */
	get zoomLevel() { return this._zoomLevel; }
	set zoomLevel(value) { this._zoomLevel = value; this.updated = false; }

	/** The elements of the graph. */
	get elements() { return this._elements; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the widget.
	 * @param deltaTime The time since the last call. */
	update(deltaTime, forced) {

		// Check if we have to force the update
		if (this._updated && !forced)
			return;

		// Get the canvas properties
		let canvas = this._canvas, ctx = this._context;
		let w = canvas.width = this.parent.element.clientWidth, h = canvas.height = this.parent.element.clientHeight;

		// Clean the background of the graph
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, w, h);

		// Translate and scale the graph
		ctx.translate(w / 2, h / 2);
		ctx.scale(this._zoom, this._zoom);
		ctx.translate(this._x, this._y);

		// DEBUG: Draw the origin point
		ctx.strokeStyle = 'red';
		let os = 10;
		ctx.strokeRect(-os / 2, os / 2, os, os);

		// Get the ontology data
		let o = this.parent.viewport.app.data.ontology;
		if (!o)
			return;

		ctx.fillStyle = 'black';
		ctx.font = "16px Arial";
		ctx.textAlign = 'center';
		ctx.textBaseline = "middle";

		// Draw the connectors for the realtionships
		for (const relation of o.relations.children) {
			let origin = o.classes[relation.origin.value].positions.children[0];
			let target = o.classes[relation.target.value].positions.children[0];
			let textPosX, textPosY;
			ctx.beginPath();
			ctx.moveTo(origin.x, origin.y);

			if (relation.midpoint.x != undefined) {
				let midpoint = relation.midpoint;
				let c = this.fitCircleToPoints(origin.x, origin.y, midpoint.x, midpoint.y, target.x, target.y);
				let ang1 = Math.atan2(origin.y - c.y, origin.x - c.x);
				let ang2 = Math.atan2(target.y - c.y, target.x - c.x);
				ctx.arc(c.x, c.y, c.radius, ang1, ang2, c.CCW);
				textPosX = midpoint.x;
				textPosY = midpoint.y;
			}
			else {
				textPosX = (origin.x + target.x) / 2;
				textPosY = (origin.y + target.y) / 2;
				ctx.lineTo(target.x, target.y);
			}

			ctx.strokeStyle = 'lightgrey';
			ctx.stroke();
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "Arial 12px";
			ctx.fillText(relation.name.value, textPosX, textPosY);
		}

		// Create the elements to draw
		this._elements = {};
		for (const c of o.classes.children) {
			let className = c.name.value;
			let element = new Element(className, c.positions.children[0], [this._basicStyle], className);
			this._elements[className] = element;
			element.draw(ctx);
		}

		// Create the Arrows
		for (const relation of o.relations.children) {
			let origin = o.classes.get(relation.origin.value);
			let target = o.classes.get(relation.target.value);
			let originPos = origin.positions.children[0];
			let targetPos = target.positions.children[0];

			if (relation.midpoint.x != undefined) {
				originPos = relation.midpoint;
			}

			let elem = this._elements[origin.name.value];
			let distance = 0;
			if (elem.shape.radius)
				distance = elem.shape.radius;

			// Create the three vertices of an arrow
			let arrowPoints = this.calculateArrow(originPos, targetPos, distance, 16);
			ctx.beginPath();
			ctx.fillStyle = "lightgrey";
			ctx.moveTo(arrowPoints[0].x, arrowPoints[0].y);
			ctx.lineTo(arrowPoints[1].x, arrowPoints[1].y);
			ctx.lineTo(arrowPoints[2].x, arrowPoints[2].y);
			ctx.fill();
		}

		// Call the base class function
		super.update(deltaTime, forced);

	}


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event) {

		switch (event.type) {
			case 'pointermove':
				let pointerEvent = event;
				if (pointerEvent.buttons == 1 || pointerEvent.buttons == 2) {
					this._x += pointerEvent.movementX / this._zoom;
					this._y += pointerEvent.movementY / this._zoom;
					this.updated = false;
				}
				break;
			case 'wheel':
				let wheelEvent = event;

				// Get the point where the user is performing the action
				let c = this._canvas, w = c.width, h = c.height, x = wheelEvent.clientX - w / 2, y = wheelEvent.clientY - h / 2, previousScale = this._zoom;

				// Calculate the new zoom level and scale factor
				this._zoomLevel += ((wheelEvent.deltaY < 0) ? 1 : -1);
				this._zoom = Math.pow(1.5, this._zoomLevel);
				console.log('Zoom: ' + (this._zoom * 100).toFixed(0) + '%');

				// Transform the location between both scales
				this._x += -x / previousScale + x / this._zoom;
				this._y += -y / previousScale + y / this._zoom;
				this.updated = false;

				break;

			case 'touchmove':
				let te = event;
				// if(te.button == 2) {
				console.log('touchmove');
				// }
				break;

			case 'dblclick':


				// for (let elementName in this._elements) {
				// 	let element = this._elements[elementName];
				// 	if
				// }

				break;

			// If it is not one of those do not capture the event
			default: return false;
		}
		// Capture the event
		return true;
	}


	// -------------------------------------------------------- PRIVATE METHODS

	fitCircleToPoints(x1, y1, x2, y2, x3, y3) {
		var x, y, u;
		const slopeA = (x2 - x1) / (y1 - y2); // slope of vector from point 1 to 2
		const slopeB = (x3 - x2) / (y2 - y3); // slope of vector from point 2 to 3
		if (slopeA === slopeB) {
			return;
		} // Slopes are same thus 3 points form striaght line. No circle can fit.
		if (y1 === y2) { // special case with points 1 and 2 have same y 
			x = ((x1 + x2) / 2);
			y = slopeB * x + (((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2));
		}
		else if (y2 === y3) { // special case with points 2 and 3 have same y 
			x = ((x2 + x3) / 2);
			y = slopeA * x + (((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2));
		}
		else {
			x = ((((y2 + y3) / 2) - slopeB * ((x2 + x3) / 2)) - (u = ((y1 + y2) / 2) - slopeA * ((x1 + x2) / 2))) / (slopeA - slopeB);
			y = slopeA * x + u;
		}

		return {
			x, y,
			radius: Math.pow((Math.pow((x1 - x), 2) + Math.pow((y1 - y), 2)), 0.5),
			CCW: ((x3 - x1) * (y2 - y1) - (y3 - y1) * (x2 - x1)) >= 0,
		};
	}


	calculateArrow(origin, target, distance, size) {

		let ax = origin.x - target.x, ay = origin.y - target.y;
		let l = Math.sqrt(ax * ax + ay * ay);
		ax /= l;
		ay /= l; // Divide by the length to obtain the unitary vector
		let bx = ay, by = -ax; // Simple 90 degree rotation 

		let cx = target.x + (ax * distance);
		let cy = target.y + (ay * distance);
		let dx = cx + (ax * size);
		let dy = cy + (ay * size);
		let hz = size / 2; // The horizontal size of the arrow

		// Create the three verices of the arrow
		return [new Vector(null, null, [cx, cy]),
			new Vector(null, null, [dx + (bx * hz), dy + (by * hz)]),
			new Vector(null, null, [dx - (bx * hz), dy - (by * hz)]),
		];
	}
}
