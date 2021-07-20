



/** Defines the main class of the SHISHO Knowledge Management System. */
class SHISHO {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new SHISHO App instance.
	 * @param {*} params The initialization parameters. */
	constructor(params = {}) {

		/** The viewports of the app. */
		this._viewports = [];

		// Adds the instance to the static array
		let iN = this._instanceNumber = SHISHO.instances.length;
		let iS = this._instanceString = "ShishoApp" + ((iN > 0) ? iN : "");
		SHISHO.instances.push(this);

		// Create an empty ontology
		this._data = new Root({ name: "unnamed_ontology" });

		// Create a new viewport
		this.viewports.push(new Viewport(this, params));

		// Get the data from the parameters
		if (params.data) {
			if (typeof params.dataElement === 'string') {
				this._dataElement = document.getElementById(params.dataElement);
				if (!this._dataElement)
					throw new Error("Invalid data element");
			}
			else
				this._dataElement = params.dataElement;
		}
		else
			this._dataElement = document.getElementById(iS + "Data");
		this.deserialize(params.data);

		// Show a message on console
		console.log(SHISHO.AppName + " " + SHISHO.AppVersion + " Initialized");
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The SHISHO app name. */
	static get AppName() { return "SHISHO"; }

	/** The SHISHO app version number. */
	static get AppVersion() { return "0.4.1"; }

	/** The SHISHO app instances. */
	static get instances() { return this._instances; }

	/** The viewports of the app. */
	get viewports() { return this._viewports; }

	/** The data of the app. */
	get data() { return this._data; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Initializes a new SHISHO app (without having to use the "new" keyword).
	* @param {*} params The initialization parameters.
	* @returns The new App instance. */
	static init(params) { return new SHISHO(params); }


	/** Loads the SHISHO data.
	 * @param data The data to load. */
	deserialize(data) {

		// If there is no data, try to get it from other sources
		if (!data) {
			if (this._dataElement)
				data = this._dataElement.textContent;
		}

		// Analyze the data
		try {
			// Try to parse string data
			if (typeof data == 'string') {
				let start = data.indexOf('{'), end = data.lastIndexOf('}');
				if (start < 0 || end < 0)
					throw new Error("Invalid JSON data");
				let jsonData = data.slice(start, end + 1);
				data = JSON.parse(jsonData);
			}

			// Deserialize the app data
			this._data.deserialize(data);

		}
		catch (e) {
			Dialog.create("Error", this._viewports[0].layers.dialog, "Error", "Unable to load data.<br>" + e.message);
			return false;
		}
	}


	/** Saves the app data. */
	serialize() {

		// Create the JSON data
		let data = "";

		// Check if we have to save the data into an HTML element
		if (this._saveToElement) {
			// If the element doesn't exist, create it
			if (!this._dataElement) {
				this._dataElement = document.createElement('script');
				this._dataElement.id = this._instanceString + "Data";
				document.body.append(this._dataElement);
			}

			// Save the JSON data in a way
			this._dataElement.textContent = "\nlet " + this._instanceString +
				"Data = " + data + ';\n';
		}

		// Return the data
		return data;
	}
}

// --------------------------------------------------------- PRIVATE FIELDS

/** The list of SHISHO App instances. */
SHISHO._instances = [];

// Set the default class to export




/** Defines an exporter to JSON Schemas. */
class JsonSchemaExporter {

	/** Exports the data of an ontology as a JSON schema.
	 * @param ontology The ontology to export.
	 * @return The JSON Schema with the ontology data. */
	static export(ontology) {

		// Create the basic elements of the JSON schema
		let schema = {
			"$id": "https://example.com/example.schema.json",
			"$schema": "http://json-schema.org/draft-07/schema#",
			properties: {}
		};

		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
			let p = schema.properties[c.name] = {};
			p.type = "object";
			p.description = c.description;
		}

		let data = JSON.stringify(schema, null, "  ");

		// Create a false link to download the data
		let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
		let url = window.URL.createObjectURL(blob);
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style.display = "none";
		link.href = url;
		link.download = "schema.json";
		link.click();
		setTimeout(function () {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}, 0);

		// Return the JSON Schema
		return data;
	}
}




/** Defines an exporter to OWL format. */
class OwlExporter {

	/** Exports the data of an ontology as a OWL.
	 * @param ontology The ontology to export.
	 * @return The OWL with the ontology data. */
	static export(ontology) {

		// Create the basic elements of the OWL 
		let owl = "";

		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
		}

		// Return the JSON Schema
		return owl;
	}
}




/** Defines an exporter to SQL format. */
class SqlExporter {

	/** Exports the data of an ontology as SQL format.
	 * @param ontology The ontology to export.
	 * @return The SQL code with the ontology data. */
	static export(ontology) {

		// Create the basic elements of the SQL code
		let sql = "";

		// Create the classes
		for (let classID in ontology.classes) {
			let c = ontology.classes[classID];
		}

		// Return the SQL code
		return sql;
	}
}






/** Manages the importain of ontologies from OWL files. */
class OwlImporter {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Imports the data from a OWL file
	 * @param ontology The ontology to import data to.
	 * @param data The data of the ontology.
	 * @param replace Whether to replace (default) or append the new data). */
	constructor(ontology, data, replace = true) {

		// Parse the data string
		let parser = new DOMParser();
		let xmlDoc = parser.parseFromString(data, "text/xml");

		// Find the main node of the OWL file
		let mainNode = null;
		for (let element of xmlDoc.getRootNode().children)
			if (element.nodeName == "rdf:RDF")
				mainNode = element;
		if (!mainNode)
			throw new Error("Invalid OWL File. ");


		// Clean the previous ontology data
		if (replace)
			ontology.deserialize();

		// Extract the useful data
		for (let element of mainNode.children) {
			switch (element.nodeName) {
				case "owl:Ontology":
					// Find the name of the class
					let newOntology, ontologyName = this.getName(element);

					break;

				case "owl:Class":

					// Create the class definition
					let newClass, className = this.getName(element);
					if (className)
						newClass = new Class({ name: className });
					else
						throw Error("Class name not defined");

					// Check if there is a class defining the position
					let x = this.findElement('entityPositionX', element);
					let y = this.findElement('entityPositionY', element);
					newClass.positions = [new Vector({
							x: (x) ? parseFloat(x.textContent) : 0,
							y: (y) ? parseFloat(y.textContent) : 0
						})];

					// Show a message on console
					console.log("Created Class: " + newClass.name +
						": " + JSON.stringify(newClass.positions));

					// Add the class to the list
					ontology.classes[className] = newClass;
					break;

				case "owl:ObjectProperty":

					// Find the name of the class
					let newProperty, propertyName = null;
					for (let attribute of element.attributes) {

						// If the name is directly specified
						if (attribute.name.toLowerCase() == "rdf:id")
							propertyName = attribute.textContent;

						// If the name has to be extracted
						if (attribute.name.toLowerCase() == "rdf:about")
							propertyName = attribute.textContent.split('#')[1];
					}

					// Get the origin and target classes
					let origin = this.findElement('domain', element);
					let target = this.findElement('range', element);
					let originName = this.extractName(origin.attributes[0]);
					let targetName = this.extractName(target.attributes[0]);
					newProperty = new Relation({ name: propertyName,
						origin: originName, target: targetName });
					ontology.relations[propertyName] = newProperty;
					console.log("Relation:" + propertyName);
					break;
			}
		}

		// Check the relations
		Object.keys(ontology.relations).forEach(relationName => {
			let relation = ontology.relations[relationName];
			if (!ontology.classes[relation.origin])
				throw Error("Class not defined: '" + relation.origin +
					"' in relation '" + relationName + "'");
			if (!ontology.classes[relation.target])
				throw Error("Class not defined: '" + relation.target +
					"' in relation '" + relationName + "'");

		});
	}


	// --------------------------------------------------------- PUBLIC METHODS

	getName(element) {
		let name, className = null;
		for (let attribute of element.attributes) {
			switch (attribute.name.toLowerCase()) {
				case "rdf:id": return attribute.textContent;
				case "rdf:about":
					name = this.extractName(attribute);
					break;
			}
		}
		return name;
	}

	extractName(node) { return node.textContent.split('#')[1]; }


	/** Looks recursively for an element with a particular name  */
	findElement(name, start) {
		let elements = [start];
		while (elements.length > 0) { // Depth first search
			let element = elements.pop();
			if (element.nodeName.includes(name))
				return element;
			elements.push(...element.children);
		}
		return null;
	}
}

/** Defines a data node. */
class Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param data The data of the Node. */
	constructor(data = {}) { this.deserialize(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The JSON representation of the instance. */
	serialize() { return null; }


	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) { }
}





/** Defines a Class of an Ontology. */
class Class extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The properties of the class. */
		this.properties = {};

		/** The positions of the class. */
		this.positions = [];
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Class without name");
		this.name = data.name;
		this.description = data.description || "";
		this.properties = {};
		if (data.properties)
			data.properties.forEach(propertyData => {
				if (!propertyData.name)
					throw Error("Property without name");
				this.properties[propertyData.name] = new Property(propertyData);
			});
		this.positions = [];
		if (data.positions)
			data.positions.forEach(positionData => {
				this.positions.push(new Vector(positionData));
			});
	}
}



/** Defines a RGB Color. */
class Color extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) { this.set(data.r, data.g, data.b); }

	/** Sets the values of the color.
	 * @param r The value of the Red component color
	 * @param g The value of the Green component color.
	 * @param b The value of the Blue component color. */
	set(r = 0, g = 0, b = 0) {
		this.r = r;
		this.g = g;
		this.b = b;
	}
}






/** Defines an Ontology. */
class Ontology extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The classes of the ontology. */
		this.classes = {};

		/** The realtions of the classes. */
		this.relations = {};
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data = {}) {
		// if (!data.name) throw Error("Ontology without name");
		this.name = data.name;
		this.description = data.description || "";
		this.classes = {};
		if (data.classes)
			data.classes.forEach(classData => {
				if (!classData.name)
					throw Error("Class without name");
				this.classes[classData.name] = new Class(classData);
			});
		this.relations = {};
		if (data.relations)
			data.relations.forEach(relationData => {
				if (!relationData.name)
					throw Error("Relation without name");
				this.relations[relationData.name] = new Relation(relationData);
			});
	}
}



/** Defines a Property of a Class. */
class Property extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Property without name");
		this.name = data.name;
		this.description = data.description;
	}
}



/** Defines a Relation between two Class instances. */
class Relation extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Relation instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {
		if (!data.name)
			throw Error("Relation without name");
		this.name = data.name;
		this.description = data.description;
		this.origin = data.origin;
		this.target = data.target;
	}
}




/** Defines the Root of a SHISHO data model. */
class Root extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Ontology class.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);

		/** The graphical styles. */
		this.styles = {};
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data = {}) {
		this.name = data.name;
		this.description = data.description;
		this.author = data.author;
		this.ontology = new Ontology(data.ontology);
	}
}



/** Defines a visual Style. */
class Style extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name() { return this._name; }

	/** The parent of the style. */
	get parent() { return this._parent; }

	/** The shape of the style. */
	get shape() { return this.parsePropertyValue('_shape'); }
	set shape(shape) { this._shape = shape; }

	/** The width of the shape. */
	get width() { return this.parsePropertyValue('_width'); }
	set width(width) { this._width = width; }

	/** The height of the shape. */
	get height() { return this.parsePropertyValue('_height'); }
	set height(height) { this._height = height; }

	/** The radius of the shape. */
	get radius() { return this.parsePropertyValue('_radius'); }
	set radius(radius) { this._radius = radius; }

	/** The secondary radius of the shape. */
	get radius2() { return this.parsePropertyValue('_radius2'); }
	set radius2(radius2) { this._radius2 = radius2; }

	/** The color of the style. */
	get color() { return this.parsePropertyValue('_color'); }
	set color(color) { this._color = color; }

	/** The color of the border. */
	get borderColor() { return this.parsePropertyValue('_borderColor'); }
	set borderColor(color) { this._borderColor = color; }

	/** The width of the border. */
	get borderWidth() { return this.parsePropertyValue('_borderWidth'); }
	set borderWidth(width) { this._borderWidth = width; }

	/** The font of the text. */
	get textFont() { return this.parsePropertyValue('_textFont'); }
	set textFont(fontName) { this._textFont = fontName; }

	/** The size of the text. */
	get textSize() { return this.parsePropertyValue('_textSize'); }
	set textSize(size) { this._textSize = size; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign() { return this.parsePropertyValue('_textAlign'); }
	set textAlign(align) { this._textAlign = align; }

	/** The color of the text. */
	get textColor() { return this.parsePropertyValue('_textColor'); }
	set textColor(color) { this._textColor = color; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) {

		// Save the name and the parent of the instance
		this._name = data.name;
		this._parent = data.parent;
		this._children = [];
		if (this._parent)
			this._children.push(this.name);

		// Parse the initialization parameters
		this.shape = data.shape;
		this.width = data.width;
		this.height = data.height;
		this.radius = data.radius;
		this.radius2 = data.radius2;
		this.color = data.color;
		this.borderColor = data.borderColor;
		this.borderWidth = data.borderWidth;
		this.textFont = data.textFont;
		this.textSize = data.textSize;
		this.textAlign = data.textAlign;
		this.textFont = data.textFont;
		this.textColor = data.textColor;
	}


	/** Obtains the value of a property.
	 * @param propertyName the name of the property. */
	parsePropertyValue(propertyName) {
		let v = this[propertyName], p = this._parent;
		// if (v == null && p !== null) return p.parsePropertyValue(propertyName);
		// if (v.endsWith())
		// return this._color || (this._parent)? this._parent.color: null; 

		return v;
	}
}



/** Defines a bi-dimensional Vector. */
class Vector extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param data The initialization data. */
	constructor(data = {}) { super(data); }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize. */
	deserialize(data) { this.set(data.x, data.y); }


	/** Sets the values of the vector.
	 * @param x The value of the vector in the X axis.
	 * @param y The value of the vector in the Y axis. */
	set(x = 0, y = 0) { this.x = x; this.y = y; }
}



/** Defines a interactive element. */
class Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Widget instance.
	 * @param name The name of the widget.
	 * @param parent The parent widget.
	 * @param elementTag The tag of the HTML element (if any). */
	constructor(name, parent, element) {

		/** The children widgets. */
		this._children = [];

		/** The visibility of the widget. */
		this._visibility = 1;

		/** Ask for removal of the widget if it is hidden. */
		this._removeIfHidden = false;

		// Store the given parameters
		this._name = name;
		this._parent = parent;
		this._element = element;

		// Establish the connection with the parent node
		if (parent) {
			this.parent.children.push(this);
			if (element && parent.element &&
				element.parentElement != parent.element) {
				parent.element.appendChild(element);
			}
		}
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the widget. */
	get name() { return this._name; }

	/** The HTML Element associated to the widget. */
	get element() { return this._element; }

	/** The parent widget. */
	get parent() { return this._parent; }
	set parent(newParent) {
		this._parent = newParent;
		let el = this.element;
		if (el && el.parentElement)
			el.parentElement.removeChild(el);
		if (el && this._parent.element)
			this._parent.element.appendChild(el);
	}

	/** The children widget. */
	get children() { return this._children; }

	/** The visibility of the widget. */
	get visibility() { return this._visibility; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer.
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Create some variables to make the update easier
		let element = this._element, parent = this._parent;

		// If it is completely hidden, remove it form the list
		if (this._removeIfHidden && this._visibility <= 0) {
			if (element && this._element.parentElement)
				element.parentElement.removeChild(element);
			if (this._parent) {
				const childIndex = parent.children.indexOf(this);
				if (childIndex >= 0)
					parent._children.splice(childIndex, 1);
			}
			return;
		}

		// Update the visibility of the HTML elements
		if (element && this._visibility != 1) {
			element.style.opacity = "" + this._visibility;
		}

		// If the visibility if less than
		if (this._visibility <= 0)
			return;

		// Update the children
		for (const child of this._children)
			child.update(deltaTime);
	}


	/** Shows the widget. */
	show() {
		this._visibility = 1;
	}


	/** Hides the widget. */
	hide() {
		this._visibility = 0;
		console.log("Hiding " + this.name);
	}


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event) {

		// Send the event backwards to the list of children
		let childIndex = 0, childCount = this._children.length;
		for (childIndex = childCount - 1; childIndex >= 0; childIndex--)
			if (this._children[childIndex].handleEvent(event))
				return true;

		return false; // By default do not capture the event
	}
}




/** Defines a layer/view of an Ontology Editor. */
class Layer extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Layer instance.
	 * @param name The name of the layer.
	 * @param viewport The Viewport the layer belongs to.
	 * @param elementTag The tag of the element. */
	constructor(name, viewport, elementTag) {

		// Call the base class constructor
		super(name, null, createElement(elementTag, viewport.element, viewport.element.id + name, null, "ShishoLayer"));

		// Store the name of the layer and the Viewport reference
		this._name = name;
		this._viewport = viewport;

	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The viewport the layer belongs to. */
	get viewport() { return this._viewport; }
}




/** Manages dialog windows. */
class DialogLayer extends Layer {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the DialogLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Dialog", viewport, "div");
	}
}




/** Displays the ontology in different ways. */
class MainLayer extends Layer {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the GraphLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Main", viewport, "div");

		// The graph widget
		this._graph = new Graph("Graph", this);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The graph widget. */
	get name() { return this._name; }
}







/** Displays the menus of the app. */
class MenuLayer extends Layer {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes the MenuLayer instance
	 * @param viewport The Viewport the layer belongs to. */
	constructor(viewport) {

		// Call the base class constructor
		super("Menu", viewport, "canvas");

		/** The shapes of the layer. */
		this._shapes = [];

		// Create the canvas for the layer
		this._canvas = this._element;

		this._context = this._canvas.getContext('2d');

		// Create 
		let style = new Style({ name: "test", shape: "circle", color: "blue", radius: "128" });
		this._shapes.push(new Shape("a", new Vector({ x: 0, y: 0 }), [style]));
		this._shapes.push(new Shape("b", new Vector({ x: 0, y: 0 }), [style]));
		this._shapes.push(new Shape("c", new Vector({ x: 0, y: 0 }), [style]));
		this._shapes.push(new Shape("d", new Vector({ x: 0, y: 0 }), [style]));
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The canvas element. */
	get canvas() { return this._canvas; }

	/** The shapes of the layer. */
	get shapes() { return this._shapes; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer.
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Call the base class function
		super.update(deltaTime);

		let canvas = this._canvas, ctx = this._context;
		let w = canvas.width = this._viewport.width, h = canvas.height = this._viewport.height;

		// Clean the canvas
		ctx.clearRect(0, 0, w, h);


		this._shapes[0].position.set(64, 64);
		this._shapes[1].position.set(w - 64, 64);
		this._shapes[2].position.set(64, h - 64);
		this._shapes[3].position.set(w - 64, h - 64);


		// Draw the shapes
		let shapeIndex, shapeCount = this._shapes.length;
		for (shapeIndex = 0; shapeIndex < shapeCount; shapeIndex++) {
			this._shapes[shapeIndex].draw(ctx);
		}


		// ctx.fillStyle = 'red';
		// ctx.fillRect(50,50,w/2,h/2);
	}
}



/** Defines a visual shape. */
class Shape {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Shape class.
	 * @param name The name of the shape.
	 * @param layer The Layer instance the shape belongs to.
	 * @param styles The styles of the shape.
	 * @param text The text of the shape.
	 * @param icon The icon of the shape. */
	constructor(name, position, styles = null, text = null, icon = null) {

		/** The visibility of the shape. */
		this._visibility = 1;

		this._name = name;
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the shape. */
	get name() { return this._name; }

	/** The position of the shape. */
	get position() { return this._position; }

	/** The Layer instance the shape belongs to. */
	get styles() { return this._styles; }

	/** The text of the shape. */
	get text() { return this._text; }

	/** The visibility of the shape. */
	get visibility() { return this._visibility; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual shape. */
	draw(ctx) {

		let s = this._styles[0];
		let p = this._position;

		ctx.beginPath();
		switch (s.shape) {
			case "circle":
				if (s.radius == undefined)
					throw Error("No radius defined");
				let r = parseFloat(s.radius);
				ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
				break;
			case "rectangle":
				break;
			default:
				throw Error("Invalid Shape Type");
				break;
		}

		if (s.color) {
			ctx.fillStyle = s.color;
			ctx.fill();
		}
		if (s.borderColor && s.borderWidth) {
			ctx.lineWidth = parseFloat(s.borderWidth);
			ctx.strokeStyle = s.borderColor;
			ctx.stroke();
		}
		if (s.textColor && s.textFont) {
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillStyle = s.textColor;
			ctx.font = s.textSize + " " + s.textFont;
			ctx.fillText(this._text, p.x, p.y);
		}

	}

	/** Finds if a point is inside the Shape */
	isInside(point) {
		return false;
	}
}







/** Defines a viewport. */
class Viewport {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Viewport instance.
	 * @param app The associated App instance.
	 * @param {*} params The initialization parameters. */
	constructor(app, params = {}) {

		/** The layers of the viewport. */
		this._layers = {};

		this._app = app;
		this._parentElement = params.parentElement || document.body;
		let instanceNumber = SHISHO.instances.length;

		// Ceate the CSS styles if 
		if (instanceNumber == 1) {
			createCssRule(".ShishoViewport", "position: relative;" +
				"width: 100%; height: 100%; margin:0; overflow: hidden;");
			createCssRule(".ShishoLayer", "position: absolute;" +
				"width: 100%; height: 100%; margin:0; overflow: hidden;");
			createCssRule(".ShishoBackground", "position: absolute;" +
				"width: 100%; height: 100%; margin:0; overflow: hidden;" +
				"background: #00000080; ");
			createCssRule(".ShishoWindow", "position: relative;" +
				"top: 50%; left: 50%; transform: translate(-50%,-50%); " +
				"box-sizing: border-box; background: white; color: black;" +
				"border: 2px solid blue; border-radius: 2vmin;" +
				"font-family: Arial, Helvetica, sans-serif; font-size: 2vmin;" +
				"width: max-content; height:max-content; box-sizing: border-box;");
			createCssRule(".ShishoWindowTitle", "width:100%; box-sizing: border-box;" +
				"background: blue; color: white; border-radius: 2vmin;" +
				"font-size: 3vmin; text-align: center; padding: 1vmin;");
			createCssRule(".ShishoWindowContents", "min-width:10vmin; min-height:10vmin; padding: 1vmin;" +
				"text-align: center;");
			createCssRule(".ShishoWindowContents label ", "font-weight:bold");
			createCssRule(".ShishoWindowContents input, .ShishoWindowContents select", "font-family: Arial, Helvetica, sans-serif; font-size: 2vmin;");
			createCssRule(".ShishoWindowButtonGroup", "display:flex; justify-content: space-evenly;");
			createCssRule(".ShishoWindowButton", "width:max-content; height:max-content; margin: 1vmin;" +
				"background: blue; color: white; border-radius: 2vmin;" +
				"font-size: 3vmin; text-align: center; padding: 1vmin;");
		}

		// Create the wrapper for the rest of the elements
		this._element = createElement("div", this._parentElement, "ShishoViewport" + instanceNumber, null, "ShishoViewport");

		// document.addEventListener('keyup', logKey);
		// window.addEventListener('resize', (e)=>);


		// Create the layers of the user interface
		let main = this._layers.main = new MainLayer(this);
		let menu = this._layers.menu = new MenuLayer(this);
		let dialog = this.layers.dialog = new DialogLayer(this);

		document.addEventListener('keyup', (e) => {
			if (e.ctrlKey && e.code == 'KeyI') {
				if (this.layers.dialog.children.length == 0)
					Dialog.create("Import", this.layers.dialog);
			}
			if (e.ctrlKey && e.code == 'KeyE') {
				if (this.layers.dialog.children.length == 0)
					Dialog.create("Export", this.layers.dialog);
				// console.log(JSON.stringify(this.app.data, null, '\t'));
			}
			e.preventDefault();
		});

		// Handle the different events by sending them to the different layers
		function handleEvent(event) {
			if (this._layers.dialog.handleEvent(event))
				return;
			if (this._layers.menu.handleEvent(event))
				return;
			if (this._layers.main.handleEvent(event))
				return;
		}
		document.addEventListener('pointerdown', handleEvent.bind(this));
		document.addEventListener('pointermove', handleEvent.bind(this));
		document.addEventListener('pointerup', handleEvent.bind(this));
		document.addEventListener('touchdown', handleEvent.bind(this));
		document.addEventListener('touchmove', handleEvent.bind(this));
		document.addEventListener('touchup', handleEvent.bind(this));

		// Start updating
		this.update(0);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The SHISHO App instance the layer belongs to. */
	get app() { return this._app; }

	/** The layers of the viewport. */
	get layers() { return this._layers; }

	/** The parent element. */
	get parentElement() { return this._parentElement; }

	/** The wrapper element. */
	get element() { return this._element; }

	/** The time since the last update. */
	get deltaTime() { return this._deltaTime; }

	/** The width of the viewport. */
	get width() { return this._element.clientWidth; }

	/** The height of the viewport. */
	get height() { return this._element.clientHeight; }

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the viewport.
	 * @param time The current time (milliseconds from beginning). */
	update(time = 0) {

		let timeInSeconds = (time > 0) ? time / 1000 : 0.001;
		this._deltaTime = timeInSeconds - this._lastTime;
		this._lastTime = timeInSeconds;
		if (this._deltaTime > 0.1)
			this._deltaTime = 0.1;


		for (const layer in this._layers) {
			this._layers[layer].update(this._deltaTime);
		}

		// console.log(time);

		// Try to redraw as soon as possible
		requestAnimationFrame(this.update.bind(this));
	}
}



// ----------------------------------------------------------- GLOBAL FUNCTIONS

/** Creates a HTML element.
 * @param tag The tag of the element.
 * @param parent The parent of the element.
 * @param id The id of the element.
 * @param name The name of the element.
 * @param className The class name(s) of the element.
 * @param style The CSS style text of the element.
 * @param text The text of the element. */
function createElement(tag, parent, id = null, name = null, className = null, style = null, text = null) {
	if (!tag)
		throw Error("Tag required");
	let element = document.createElement(tag);
	if (parent)
		parent.appendChild(element);
	if (id)
		element.id = id;
	if (name)
		element.id = name;
	if (className)
		element.className = className;
	if (style)
		element.style.cssText = style;
	if (text)
		element.innerText = text;
	return element;
}

/** Creates a CSS rule.
 * @param selectorText The selector of the CSS rule.
 * @param styleText The style text block of the CSS rule.
 * @param override Whether or not to override a previous rule. */
function createCssRule(selectorText, styleText, override = false) {
	// If there is no stylesheet, create it
	if (document.styleSheets.length == 0)
		document.head.append(document.createElement('style'));
	let stylesheet = document.styleSheets[0];

	// Check if the rule exists
	let cssText = selectorText + ' {' + styleText + '}';
	let rules = stylesheet.cssRules, ruleIndex, ruleCount = rules.length;
	for (ruleIndex = 0; ruleIndex < ruleCount; ruleIndex++) {
		if (rules[ruleIndex].cssText.indexOf(selectorText) == 0 &&
			rules[ruleIndex].cssText[selectorText.length] == ' ') {
			if (override)
				rules[ruleIndex].cssText = cssText;
			return;
		}
	}

	// If no rule was fond, create i and add it at the end
	stylesheet.insertRule(selectorText + ' {' + styleText + '}', ruleCount);
}





/** Defines a background. */
class Background extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Background class.
	 * @param name The widget name;
	 * @param parent The parent widget. */
	constructor(name, parent) {

		// Call the base class constructor
		super(name, parent, createElement("div", parent.element, parent.element + "Background", null, "ShishoBackground"));

		this._removeIfHidden = true;
	}
}





/** Define a Button Widget. */
class Button extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Dialog class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param title The title of the dialog window.
	 * @param contents The contents of the dialog window.
	 * @param buttons The buttons of the dialog window. */
	constructor(name, parent, text, callbacks = []) {

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._text = text;
		this._callbacks = callbacks;

		// Create the element
		let parentElement = (parent && parent.element) ? parent.element : null;
		this._element = createElement("div", parentElement, name, null, "ShishoWindowButton", null, this._text);

		// On click, call the callback functions
		this._element.addEventListener('click', (e) => {
			for (let c of this._callbacks)
				if (c(this) == false)
					return;
		});
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the button. */
	get text() { return this._text; }

	/** The callbacks for the button. */
	get callbacks() { return this._callbacks; }
}













/** Defines a dialog window. */
class Dialog extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Dialog class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param title The title of the dialog window.
	 * @param contents The contents of the dialog window.
	 * @param buttons The buttons of the dialog window. */
	constructor(name, parent, title, contents, buttons, background) {

		// Call the base class constructor
		super(name, parent);

		// Remove when hidden
		this._removeIfHidden = true;

		// Store the given parameters
		this._title = title;
		this._contents = contents;
		this._buttons = buttons;
		this._background = background;

		// Create the different elements
		let parentElement = (parent && parent.element) ? parent.element : null;
		if (this.background)
			parentElement = background.element;

		// Create the element of the dialog
		this._element = createElement("div", parentElement, name, null, "ShishoWindow");

		// Create the title of the dialog
		this._titleGroup = new Widget("TitleGroup", this, createElement("div", this._element, name + title, null, "ShishoWindowTitle", null, this._title));

		// Create the title of the dialog
		this._contentsGroup = new Widget("ContentsGroup", this, createElement("div", this._element, name + title, null, "ShishoWindowContents"));

		// Add the contents
		for (let content of this._contents)
			content.parent = this._contentsGroup;

		// Create the Button Group
		this._buttonGroup = new Widget("ButtonGroup", this, createElement("div", this._element, name + "Buttons", null, "ShishoWindowButtonGroup"));

		// Add the button and add a callback to hide the dialog
		for (let button of this._buttons) {
			button.parent = this._buttonGroup;
			button.callbacks.push(() => {
				this.hide();
				if (this._background)
					this._background.hide();
			});
		}
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The background of the dialog window. */
	get background() { return this._background; }

	/** The title of the dialog window. */
	get title() { return this._title; }

	/** The contents of the dialog window. */
	get contents() { return this._contents; }

	/** The buttons at the bottom of the dialog window. */
	get buttons() { return this._buttons; }

	// --------------------------------------------------------- PUBLIC METHODS

	update(deltaTime) {

		super.update(deltaTime);

		// Update the background
		// if (this.background. = this._visibility ) {
		// }


		// console.log("Updating Dialog");
	}

	// --------------------------------------------------------- STATIC METHODS

	/** Simplifies the creation of dialog windows. */
	static create(type, layer, title = null, message = null) {

		switch (type) {
			case "Import": return new Dialog("Import", layer, "Import File...", [
				new FileInput("FileInput", null, "File: "),
				new Selector("FileType", null, "File Type: ", ["OWL", "JSON"]),
			], [
				new Button("Cancel", null, "Cancel"),
				new Button("Import", null, "Import", [(button) => {
						let dialog = button.parent.parent;
						let fileInput = dialog.contents[0];
						let fileType = dialog.contents[1];

						console.log(fileInput.filePath);

						try { // to load the ontology
							if (fileInput.filePath == null)
								throw Error("No file provided.");
							new OwlImporter(layer.viewport.app.data.ontology, fileInput.fileData);
						}
						catch (e) {
							console.error(e);
							Dialog.create("Error", layer, "Error", "Unable to import File.<br>" + e.message);
							return false;
						}
					}]),
			], new Background("ImportBackground", layer));
			case "Export": return new Dialog("Export", layer, "Export File...", [
				new Selector("FileType", null, "File Type: ", ["OWL", "SCHEMA.JSON", "SQL"]),
			], [
				new Button("Cancel", null, "Cancel"),
				new Button("Export", null, "Export", [(button) => {
						let dialog = button.parent.parent;
						let fileType = dialog.contents[0];

						let ontology = layer.viewport.app.data.ontology;
						let data = "";
						switch (fileType.selectedOption) {
							case "OWL":
								data = OwlExporter.export(ontology);

								break;
							case "SCHEMA.JSON":
								data = JsonSchemaExporter.export(ontology);
								break;
							case "SQL":
								data = SqlExporter.export(ontology);
								break;
						}
						console.log(data);

					}]),
			], new Background("ImportBackground", layer));
			case "Error": return new Dialog("Error", layer, title, [new Text("ErrorMessage", null, message)], [new Button("OK", null, "OK")], new Background("ErrorBackground", layer));
		}
	}
}





/** Provides a way to input the URI of a file. */
class FileInput extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the FileInput class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param label The label of the widget. */
	constructor(name, parent, label) {

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._label = label;

		// Create the element
		let parentElement = (parent && parent.element) ? parent.element : null;
		this._element = createElement("p", parentElement, name);

		// Create the label element
		this._labelElement = createElement("label", this._element, name + "Label", null, null, null, label);

		// Create the input file
		this._inputElement = createElement("input", this._element, name + "Input");
		this._inputElement.type = "file";

		// When a file is selected, try to load it
		this._inputElement.onchange = (e) => {

			// Get the file metadata
			let file = e.target.files[0];
			this._fileName = file.name;
			this._filePath = file.path;

			//TODO: Add a Loading message 

			// Create a reader
			let reader = new FileReader();
			reader.readAsText(file, 'UTF-8');
			reader.onload = readerEvent => {
				this._fileData = readerEvent.target.result.toString();
			};
		};
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the selected file. */
	get fileName() { return this._fileName; }

	/** The data of the selected file. */
	get filePath() { return this._filePath; }

	/** The data of the selected file. */
	get fileData() { return this._fileData; }
}







/** Defines a Graph. */
class Graph extends Widget {

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




/** Defines a text widget. */
class Label extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Label class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param text The text of the label. */
	constructor(name, parent, text) {

		// Call the base class constructor
		super(name, parent, createElement("label", null));

		// Save the text
		this.text = text;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the label. */
	get text() { return this._text; }
	set text(value) { this._element.innerHTML = this._text = value; }
}




/** Provides a way to select between multiple options. */
class Selector extends Widget {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Selector class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param label The label of the widget.
	 * @param options The options of the widget. */
	constructor(name, parent, label, options) {

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._label = label || "";
		this._options = options || [];

		// Create the element
		let parentElement = (parent && parent.element) ? parent.element : null;
		this._element = createElement("p", parentElement, name);

		// Create the label element
		this._labelElement = createElement("label", this._element, name + "Label", null, null, null, label);

		// Create the input element
		this._selectElement = createElement("select", this._element, name + "Label", null, null, null, label);


		// Create the options
		let optionIndex = 0, optionCount = this._options.length;
		for (optionIndex = 0; optionIndex < optionCount; optionIndex++) {
			let o = createElement("option", this._selectElement, null, null, null, null, this._options[optionIndex]);
			o.value = "" + optionIndex;
		}
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The selected option value. */
	get selectedOption() { return this._options[this.selectedIndex]; }

	/** The selected index. */
	get selectedIndex() { return parseInt(this._selectElement.value); }
}





/** Defines a text widget. */
class Text extends Widget {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Label class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param text The text of the text. */
	constructor(name, parent, text) {

		// Call the base class constructor
		super(name, parent, createElement("p", null));

		// Save the text
		this.text = text;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The text of the text. */
	get text() { return this._text; }
	set text(value) { this._element.innerHTML = this._text = value; }
}




