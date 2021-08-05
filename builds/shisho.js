


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
		this._data = new Root();

		// DEBUG 
		// let style = new Style("test", null, {
		// 	name: "test", shape: "circle",
		// 	color: [0, 128, 255],
		// 	radius: 128, iconColor: [255, 255, 255], iconSize: 160
		// });
		// console.log(style.serialize());
		// return;

		// if (params.data) {
		// 	this._data.deserialize(params.data);
		// 	console.log(this._data.serialize());
		// 	console.log(JSON.stringify(this._data.serialize(),null, '\t'));
		// 	return;
		// }


		// Create a new viewport
		this._viewports.push(new Viewport(this, params));

		// Check if there is a data element to analyze
		if (params.dataElement) {
			this._dataElement = document.getElementById(params.dataElement);
		}
		else
			this._dataElement = document.getElementById(iS + "Data");

		// Get the data from the parameters
		if (params.data) {
			if (typeof params.data === 'string') {
				this._dataElement = document.getElementById(params.dataElement);
				if (!this._dataElement)
					throw new Error("Invalid data element");
			}

			// Try to deserialize the given data
			this.deserialize(params.data);
		}



		// Show a message on console
		console.log(SHISHO.AppName + " " + SHISHO.AppVersion + " Initialized");
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The SHISHO app name. */
	static get AppName() { return "SHISHO"; }

	/** The SHISHO app version number. */
	static get AppVersion() { return "0.4.1"; }

	/** The SHISHO app instance number. */
	static get _instanceNumber() { return this._instanceNumber; }

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
			// Dialog.create("Error", this._viewports[0].layers.dialog, "Error", 
			// 	"Unable to load data.<br>" + e.message);
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

// --------------------------------------------------- PUBLIC STATIC FIELDS

/** The SHISHO app instances. */
SHISHO.instances = [];

/** The SHISHO app resources. */
SHISHO.resources = {};

// Set the default class to export





/** Defines an exporter to JSON Files. */
class JsonExporter {

	/** Exports the data of an ontology as a JSON file.
	 * @param ontology The ontology to export.
	 * @return The JSON file with the ontology data. */
	static export(ontology) {

		// Simply use JSON.stringify to convert to JSON
		let data = ontology.serialize();

		// Create a false link to download the data
		let blob = new Blob([data], { type: "text/plain;charset=utf-8" });
		let url = window.URL.createObjectURL(blob);
		let link = document.createElement("a");
		document.body.appendChild(link);
		link.style.display = "none";
		link.href = url;
		link.download = "file.json";
		link.click();
		setTimeout(function () {
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		}, 0);

		// Return the JSON Schema
		return data;
	}
}






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
			let p = schema.properties[c.name.value] = {};
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



/** Manages the importation of ontologies from JSON files. */
class JsonImporter {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Imports the data from a JSON file
	 * @param root The root of the SHISHO data model.
	 * @param data The JSON file data.
	 * @param combine Whether to combine (default) or append the new data). */
	static import(root, data, combine = true) {

		// Parse the Json data
		let jsonData = JSON.parse(data);

		// deserialize the JSON data
		root.deserialize(jsonData, combine);
	}
}





/** Manages the importation of ontologies from OWL files. */
class OwlImporter {

	// --------------------------------------------------------- PUBLIC METHODS

	/** Imports the data from a OWL file
	 * @param root The root of the SHISHO data model.
	 * @param data The JSON file data.
	 * @param combine Whether to combine (default) or append the new data). */
	static import(root, data, combine = true) {

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

		// Operate in the ontology
		let ontology = root.ontology;

		// Clean the previous ontology data
		if (!combine)
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
						newClass = new Class("className", ontology, { name: className });
					else
						throw Error("Class name not defined");

					// Check if there is a class defining the position
					let x = this.findElement('entityPositionX', element);
					let y = this.findElement('entityPositionY', element);
					newClass.positions = [new Vector("position", newClass, {
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
					newProperty = new Relation(propertyName, ontology, { name: propertyName,
						origin: originName, target: targetName });
					ontology.relations[propertyName] = newProperty;
					console.log("Relation:" + propertyName);
					break;
			}
		}

		// Check the relations
		Object.keys(ontology.relations).forEach(relationName => {
			let relation = ontology.relations[relationName];
			if (!ontology.classes[relation.origin.value])
				throw Error("Class not defined: '" + relation.origin +
					"' in relation '" + relationName + "'");
			if (!ontology.classes[relation.target.value])
				throw Error("Class not defined: '" + relation.target +
					"' in relation '" + relationName + "'");

		});
	}



	static getName(element) {
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

	static extractName(node) { return node.textContent.split('#')[1]; }


	/** Looks recursively for an element with a particular name  */
	static findElement(name, start) {
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

/** Defines a data Node. */
class Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Node instance.
	 * @param name The name of the Node.
	 * @param parent The parent Node.
	 * @param data The initialization data. */
	constructor(name, parent, data = null) {

		// Initialize the data of the node
		this._nodeName = name || "node";
		this._nodeParent = parent;
		this._nodeChildren = [];
		this._nodeUpdated = false;

		// Create a link between the node and its parent
		if (parent)
			parent._nodeChildren.push(this);
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Node. */
	get nodeName() { return this._nodeName; }

	/** The parent Node. */
	get nodeParent() { return this._nodeParent; }

	/** The children Nodes. */
	get nodeChildren() { return this._nodeChildren; }

	/** Indicates if the Node has been updated or not. */
	get nodeUpdated() { return this._nodeUpdated; }
	set nodeUpdated(value) {

		// Propagate "true" values downwards in the node hierarchy
		if (value)
			this._nodeChildren.forEach(c => { c.nodeUpdated = true; });

		// Otherwise, propagate "false" values updwards in the node hierarchy
		else if (this._nodeParent)
			this._nodeParent.nodeUpdated = false;

		// Apply the value
		this._nodeUpdated = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS


	/** Serializes the Node instance.
	 * @return The serialized data. */
	serialize() {

		// Create an object to serialize the Node
		let serializedObject = {};

		// Save the data of the children
		let childIndex = 0, childCount = this._nodeChildren.length;
		for (childIndex = 0; childIndex < childCount; childIndex++) {
			let childNode = this._nodeChildren[childIndex];
			serializedObject[childNode._nodeName] = childNode.serialize();
		}

		// Return the object with the serializated data
		return serializedObject;
	}


	/** Deserializes the Node instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (typeof data == "string")
			return JSON.parse(data);
	}
}







/** Defines a Class of an Ontology. */
class Class extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Class instance.
	 * @param ontology The Ontology the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, ontology, data) {

		// Call the base class constructor
		super(nodeName || "class", ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._properties = new NodeSet("properties", this, Property);
		this._positions = new NodeSet("positions", this, Vector);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Class. */
	get name() { return this._name; }

	/** The description of the Class. */
	get description() { return this._description; }

	/** The properties of the Class. */
	get properties() { return this._properties; }

	/** The positions of the Class in the different Graph views. */
	get positions() { return this._positions; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Class instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Class without name.");
		if (data.description)
			this._description.deserialize(data.description);
		if (data.properties)
			this._properties.deserialize(data.properties);
		if (data.positions)
			this._positions.deserialize(data.positions);
	}
}






/** Defines an Ontology. */
class Ontology extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Ontology instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName, root, data) {

		// Call the base class constructor
		super(nodeName || "ontology", root, data);

		// Initialize the child nodes
		this._classes = new NodeSet("classes", this, Class);
		this._relations = new NodeSet("relation", this, Relation);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The classes of the ontology. */
	get classes() { return this._classes; }

	/** The relations of the ontology. */
	get relations() { return this._relations; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Ontology instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (data.classes)
			this._classes.deserialize(data.classes);
		if (data.relations)
			this._relations.deserialize(data.relations);
		1;
	}
}





/** Defines a Property of a Class. */
class Property extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Property instance.
	 * @param parentClass The class the Class instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, parentClass, data) {

		// Call the base class constructor
		super(nodeName || "property", parentClass, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Property. */
	get name() { return this._name; }

	/** The description of the Property. */
	get description() { return this._description; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Property instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Property without name.");
		if (data.description)
			this._description.deserialize(data.description);
	}
}




/** Defines a Relation between two Class instances. */
class Relation extends Node {



	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Relation instance.
	 * @param ontology The Ontology the Relation instance belongs to.
	 * @param data The initialization data. */
	constructor(nodeName, ontology, data) {

		// Call the base class constructor
		super(nodeName || "relation", ontology, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._origin = new String("origin", this);
		this._target = new String("target", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Class. */
	get name() { return this._name; }

	/** The description of the Class. */
	get description() { return this._description; }

	/** The origin Class of the Relation. */
	get origin() { return this._origin; }

	/** The target Class of the Relation. */
	get target() { return this._target; }

	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Relation instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Relation without name.");
		if (data.description)
			this._description.deserialize(data.description);
		if (data.origin)
			this._origin.deserialize(data.origin);
		else
			throw Error("Relation without origin (" + data.name + ").");
		if (data.target)
			this._target.deserialize(data.target);
		else
			throw Error("Relation without target (" + data.name + ").");
	}
}







/** Defines the Root of a SHISHO knowledge base. */
class Root extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Root instance.
	 * @param data The initialization data. */
	constructor(data) {
		// Call the base class constructor
		super("root", null, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._description = new String("description", this);
		this._author = new String("author", this);
		this._ontology = new Ontology("ontology", this);
		this._styles = new NodeSet("styles", this, Style);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the Root. */
	get name() { return this._name; }

	/** The description of the Root. */
	get description() { return this._description; }

	/** The author of the Root. */
	get author() { return this._author; }

	/** The ontology of the Root. */
	get ontology() { return this._ontology; }

	/** The styles of the Root. */
	get styles() { return this._styles; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Root instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name)
			this._name.deserialize(data.name);
		else
			throw Error("Knowledge base without name.");
		if (data.description)
			this._description.deserialize(data.description);
		if (data.ontology)
			this._ontology.deserialize(data.ontology, combine);
		if (data.styles)
			this.styles.deserialize(data.ontology, combine);
	}
}






/** Defines a visual Style. */
class Style extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Style instance.
	 * @param root The root of the SHISHO data model.
	 * @param data The initialization data. */
	constructor(nodeName, root, data) {

		// Call the base class constructor
		super(nodeName || "style", root, data);

		// Initialize the child nodes
		this._name = new String("name", this);
		this._parent = new String("parent", this);

		this._shape = new String("shape", this);
		this._width = new Measure("width", this);
		this._height = new Measure("height", this);
		this._radius = new Measure("radius", this);
		this._radius2 = new Measure("radius2", this);

		this._color = new Color("color", this);
		this._borderColor = new Color("border_color", this);
		this._borderWidth = new Measure("border_width", this);

		this._textFont = new String("text_font", this);
		this._textSize = new Measure("text_size", this);
		this._textAlign = new String("text_align", this);
		this._textColor = new Color("text_color", this);

		this._icon = new String("icon", this);
		this._iconColor = new Color("icon_color", this);
		this._iconSize = new Measure("icon_size", this);
		this._iconOffsetX = new Measure("icon_offset_x", this);
		this._iconOffsetY = new Measure("icon_offset_y", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the style. */
	get name() { return this._name; }

	/** The parent of the style. */
	get parent() { return this._parent; }

	/** The shape of the style. */
	get shape() { return this._shape; }

	/** The width of the shape. */
	get width() { return this._width; }

	/** The height of the shape. */
	get height() { return this._height; }

	/** The radius of the shape. */
	get radius() { return this._radius; }

	/** The secondary radius of the shape. */
	get radius2() { return this._radius2; }

	/** The color of the style. */
	get color() { return this._color; }
	set color(value) { this._color = value; }

	/** The color of the border. */
	get borderColor() { return this._borderColor; }
	set borderColor(value) { this._borderColor = value; }

	/** The width of the border. */
	get borderWidth() { return this._borderWidth; }

	/** The font of the text. */
	get textFont() { return this._textFont; }

	/** The size of the text. */
	get textSize() { return this._textSize; }

	/** The horizontal and vertical alignment of the text. */
	get textAlign() { return this._textAlign; }

	/** The color of the text. */
	get textColor() { return this._textColor; }

	/** The icon of the shape. */
	get icon() { return this._icon; }

	/** The icon color of the style. */
	get iconColor() { return this._iconColor; }

	/** The icon size of the style. */
	get iconSize() { return this._iconSize; }

	/** The icon offset X of the style. */
	get iconOffsetX() { return this._iconOffsetX; }

	/** The icon offset X of the style. */
	get iconOffsetY() { return this._iconOffsetY; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the Style instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data = {}, combine = true) {

		// Deserialize the properties of the class
		if (data.name != undefined)
			this._name.deserialize(data.shape);
		if (data.parent != undefined)
			this._parent.deserialize(data.parent);
		if (data.shape != undefined)
			this._shape.deserialize(data.shape);
		if (data.width != undefined)
			this._width.deserialize(data.width);
		if (data.height != undefined)
			this._height.deserialize(data.height);
		if (data.radius != undefined)
			this._radius.deserialize(data.radius);
		if (data.radius2 != undefined)
			this._radius2.deserialize(data.radius2);
		if (data.color != undefined)
			this._color.deserialize(data.color);
		if (data.border_color != undefined)
			this._borderColor.deserialize(data.border_color);
		if (data.border_width != undefined)
			this._borderWidth.deserialize(data.border_width);
		if (data.text_font != undefined)
			this._textFont.deserialize(data.text_font);
		if (data.text_size != undefined)
			this._textSize.deserialize(data.text_size);
		if (data.text_align != undefined)
			this._textAlign.deserialize(data.text_align);
		if (data.text_color != undefined)
			this._textColor.deserialize(data.text_color);
		if (data.icon != undefined)
			this._icon.deserialize(data.icon);
		if (data.icon_color != undefined)
			this._iconColor.deserialize(data.icon_color);
		if (data.icon_size != undefined)
			this._iconSize.deserialize(data.icon_size);
		if (data.icon_offset_x != undefined)
			this._iconOffsetX.deserialize(data.icon_offset_x);
		if (data.icon_offset_y != undefined)
			this._iconOffsetY.deserialize(data.icon_offset_y);
	}


	/** Obtains the value of a property.
	 * @param propertyName The name of the property. */
	getValue(propertyName) {

		let v = this[propertyName], p = this._parent;
		// if (v == null && p !== null) return p.parsePropertyValue(propertyName);
		// if (v.endsWith())
		// return this._color || (this._parent)? this._parent.color: null; 

		return v;
	}


	/** Combines multiple styles into one.
	 * @param styles The styles to combine. */
	static combine(styles) {
		if (!styles || styles.length == 0)
			throw Error("No styles to combine");
		if (styles.length == 1)
			return styles[0];
		let combination = new Style("style", null);
		for (let styleIndex = 0; styleIndex < styles.length; styleIndex++) {
			let style = styles[styleIndex];
			let styleData = style.serialize();
			// console.log(styleData);
			combination.deserialize(styleData);
		}
		// console.log(combination.serialize());
		return combination;
	}
}



/** Defines a Node set. */
class NodeSet extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Color class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, typeConstructor, data = {}) {
		super(nodeName || "color", nodeParent, data);
		this._typeConstructor = typeConstructor;
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The children Nodes (converted to the type). */
	get children() {
		return this.nodeChildren;
	}

	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {

		for (const key in data) {
			let node = new this._typeConstructor(key, this, data[key]);
			this[key] = node;
		}
	}
}





/** Defines a RGB Color. */
class Color extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Color class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class constructor
		super(nodeName || "color", nodeParent, data);

		// Initialize the child nodes
		this._r = new Number("r", this);
		this._g = new Number("g", this);
		this._b = new Number("b", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The red component of the Color. */
	get r() { return this._r; }

	/** The green component of the Color. */
	get g() { return this._g; }

	/** The blue component of the Color. */
	get b() { return this._b; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {

		// If the data is an array, copy the first three values
		if (Array.isArray(data))
			this.set(data[0], data[1], data[2]);
		// Otherwise, get the different values
		else {
			if (data.r != undefined)
				this._r.value = data.r;
			if (data.g != undefined)
				this._g.value = data.g;
			if (data.b != undefined)
				this._b.value = data.b;
		}
	}


	/** Sets the values of the Color.
	 * @param r The value of the Red component Color
	 * @param g The value of the Green component Color.
	 * @param b The value of the Blue component Color. */
	set(r = 0, g = 0, b = 0) {
		this._r.value = r;
		this._g.value = g;
		this._b.value = b;
	}

	/** Gets the representation of the Color. */
	get() {
		return "rgb(" + this._r.value + ", " + this._g.value + ", " +
			this._b.value + ")";
	}
}






/** Defines a Measure. */
class Measure extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the vector class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class constructor
		super(nodeName || "measure", nodeParent, data);

		// Initialize the child nodes
		this._quantity = new Number("quantity", this);
		this._unit = new String("unit", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The numeric value of the Measure. */
	get quantity() { return this._quantity; }

	/** The type of unit of the Measure. */
	get unit() { return this._unit; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		if (typeof data == "number")
			this._quantity.value = data;
		else if (typeof data == "string")
			this._quantity.value = parseInt(data);
		// Get the different values
		else {
			if (data.quantity != undefined)
				this.quantity.value = data.quantity;
			if (data.unit != undefined)
				this.unit.value = data.unit;
		}
	}


	/** Sets the values of the Measure.
	 * @param quantity The numeric value of the Measure.
	 * @param unit The type of unit of the Measure. */
	set(quantity, unit) {
		this.quantity.value = quantity;
		this.unit.value = unit;
	}

	/** Gets the actula numeric value. */
	get() {
		return this.quantity.value;
	}
}




/** Defines a Number Node. */
class Number extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Number class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class nada
		super(nodeName || "string", nodeParent, data);

		// Initialize the value
		this._value = undefined;

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the Number. */
	get value() { return this._value; }
	set value(value) {
		// Ift he value is different, mark the node for update
		if (this.value != value)
			this.nodeUpdated = false;

		// Set the new value
		this._value = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		if (data == null)
			this.value = 0;
		else if (typeof data == "number")
			this.value = data;
	}
}




/** Defines a Text Node. */
class String extends Node {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the String class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data = {}) {
		// Call the base class constructor
		super(nodeName || "string", nodeParent, data);

		// Initialize the value
		this._value = undefined;

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the String. */
	get value() { return this._value; }
	set value(value) {
		// Ift he value is different, mark the node for update
		if (this.value != value)
			this.nodeUpdated = false;

		// Set the new value
		this._value = value;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the instance.
	 * @data The data to deserialize.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		if (data == null)
			this.value = null;
		else if (typeof data == "string")
			this.value = data;
	}
}





/** Defines a bi-dimensional Vector. */
class Vector extends Node {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Vector class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param data The initialization data. */
	constructor(nodeName, nodeParent, data) {

		// Call the base class constructor
		super(nodeName || "vector", nodeParent, data);

		// Initialize the child nodes
		this._x = new Number("x", this);
		this._y = new Number("y", this);

		// Deserialize the initialization data
		if (data != undefined)
			this.deserialize(data);
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The value of the Vector in the X axis. */
	get x() { return this._x.value; }
	set x(value) { this._x.value = value; }

	/** The value of the Vector in the Y axis. */
	get y() { return this._y.value; }
	set y(value) { this._y.value = value; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Deserializes the instance.
	 * @combine Whether to combine with or to replace the previous data. */
	deserialize(data, combine = true) {
		// If the data is an array, copy the first two values
		if (Array.isArray(data))
			this.set(data[0], data[1]);

		// Otherwise, get the different values
		else {
			if (data.x != undefined)
				this._x.value = data.x;
			if (data.y != undefined)
				this._y.value = data.y;
		}
	}


	/** Sets the values of the Vector.
	 * @param x The value of the Vector in the X axis.
	 * @param y The value of the Vector in the Y axis. */
	set(x = 0, y = 0) { this._x.value = x; this._y.value = y; }

	toString() { return this._x.value + ", " + this._y.value; }
}







/** Defines a visual Element. */
class Element {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the element class.
	 * @param name The name of the element.
	 * @param layer The Layer instance the element belongs to.
	 * @param styles The styles of the element.
	 * @param text The text of the element.
	 * @param icon The icon of the element. */
	constructor(name, position, styles = null, text = null, icon = null) {

		/** The visibility of the element. */
		this._visibility = 1;

		this._name = name;
		this._position = position || new Vector();
		this._styles = styles || [];
		this._text = text;
		this._icon = icon;
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The name of the element. */
	get name() { return this._name; }

	/** The position of the element. */
	get position() { return this._position; }

	/** The Layer instance the element belongs to. */
	get styles() { return this._styles; }

	/** The text of the element. */
	get text() { return this._text; }

	/** The icon of the element. */
	get icon() { return this._icon; }

	/** The visibility of the element. */
	get visibility() { return this._visibility; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Draws the visual element. */
	draw(ctx) {

		// Get the style to apply
		let s = Style.combine(this._styles);
		let p = this._position;

		// Save the current state
		ctx.save();

		// Calculate the size of the text
		let textShapes = [], textWidth = 0, textHeight = 0;
		if (this._text && s.textFont) {
			ctx.font = s.textSize.get() + " " + s.textFont.value;
			let lines = this._text.split('\n'), lineCount = lines.length, lineHeight = s.textSize.get(), lineSep = lineHeight * 0.5;
			textHeight = lineHeight * lineCount;


			for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
				let line = lines[lineIndex];
				let m = ctx.measureText(line);
				if (textWidth < m.width)
					textWidth = m.width;

				textShapes.push(new Shape({
					text: line, x: 0, y: (lineHeight * lineIndex) - textHeight / 2 + lineHeight / 2
				}));
			}
		}


		// Create the background shape
		ctx.beginPath();
		switch (s.shape.value) {
			case "circle":
				if (s.radius == undefined)
					throw Error("No radius defined");
				let r = s.radius.get();
				ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
				break;
			case "rectangle":
				break;
			// default: throw Error("Invalid element Type"); break;
		}

		// Create the background shape

		if (s.color) {
			ctx.fillStyle = s.color.get();
			ctx.fill();
		}
		if (s.borderColor && s.borderWidth) {
			ctx.lineWidth = s.borderWidth.get();
			ctx.strokeStyle = s.borderColor.get();
			ctx.stroke();
		}


		// Draw the icon
		if (this._icon) {
			// console.log(s.serialize());
			if (s.iconColor)
				ctx.fillStyle = s.iconColor.get();
			if (s.iconOffsetX)
				ctx.translate(s.iconOffsetX.get(), 0);
			if (s.iconOffsetY)
				ctx.translate(0, s.iconOffsetY.get());
			if (SHISHO.resources[this._icon]) {
				SHISHO.resources[this._icon].draw(ctx, p, s.iconSize.get());
			}
			else
				throw Error("Unknow Icon: " + this._icon);
		}

		// Draw the texts
		for (const textShape of textShapes) {
			if (s.textColor)
				ctx.fillStyle = s.textColor.get();
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			textShape.draw(ctx, p);
		}



		// Restore the previous state
		ctx.restore();
	}

	/** Finds if a point is inside the element */
	isInside(point) {
		return false;
	}
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

		/** The elements of the layer. */
		this._elements = [];

		// Create the canvas for the layer
		this._canvas = this._element;

		this._context = this._canvas.getContext('2d');

		// Create 
		let style = new Style("test", null, {
			name: "test", shape: "circle", color: [0, 128, 255],
			radius: 128, icon_color: [255, 255, 255], icon_size: 160
		});
		this._elements.push(new Element("a", new Vector("p", null, { x: 0, y: 0 }), [style,
			new Style(null, null, { icon_offset_x: 32, icon_offset_y: 32 })], null, "App"));
		this._elements.push(new Element("b", new Vector("p", null, { x: 0, y: 0 }), [style,
			new Style(null, null, { icon_offset_x: -32, icon_offset_y: 32 })], null, "Options"));
		this._elements.push(new Element("c", new Vector("p", null, { x: 0, y: 0 }), [style,
			new Style(null, null, { icon_offset_x: 32, icon_offset_y: -32 })], null, "Test"));
		this._elements.push(new Element("d", new Vector("p", null, { x: 0, y: 0 }), [style]));
	}


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The canvas element. */
	get canvas() { return this._canvas; }

	/** The elements of the layer. */
	get elements() { return this._elements; }


	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the layer.
	 * @param deltaTime The time since the last call. */
	update(deltaTime) {

		// Call the base class function
		super.update(deltaTime);

		// return; // TEMPORAL

		let canvas = this._canvas, ctx = this._context;
		let w = canvas.width = this._viewport.width, h = canvas.height = this._viewport.height;


		// Clean the canvas
		ctx.clearRect(0, 0, w, h);


		this._elements[0].position.set(64, 64);
		this._elements[1].position.set(w - 64, 64);
		this._elements[2].position.set(64, h - 64);
		this._elements[3].position.set(w - 64, h - 64);


		// Draw the elements
		let elementIndex, elementCount = this._elements.length;
		for (elementIndex = 0; elementIndex < elementCount; elementIndex++) {
			this._elements[elementIndex].draw(ctx);
		}


		// ctx.fillStyle = 'red';
		// ctx.fillRect(50,50,w/2,h/2);
	}
}

/** Defines a visual Shape. */
class Shape {

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
			ctx.translate(position.x, position.y);

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
				ctx.lineWidth = parseFloat(this._borderWidth);
				ctx.strokeStyle = this._borderColor;
				ctx.stroke();
			}
		}

		// Draw the text
		if (this._text) {

			// if (this._font) ctx.1
			// Draw the path
			ctx.fillStyle = this._color;
			ctx.fillText(this._text, 0, 0);
		}

		// Draw the subshapes
		this._children.forEach(child => { child.draw(ctx); });

		// Restor the previous state
		ctx.restore();
	}
}





class Rectangle extends Shape {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Shape instance.
	 * @param data The initialization data. */
	constructor(data = {}) {
		super(data);
		this._radius = data.radius || 0;
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

		/** The last recorded time. */
		this._lastTime = 0;

		/** The time since the last update. */
		this._deltaTime = 0;

		this._FPSTime = 0;

		this._FPSCount = 0;

		this._FPSValue = 0;

		this._app = app;
		this._parentElement = params.parentElement || document.body;
		let instanceNumber = SHISHO.instances.length;

		// Create the CSS styles if they don't exist
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
			// Prevent the default event management
			event.preventDefault();

			// Go through the layers
			if (this._layers.dialog.handleEvent(event))
				return;
			if (this._layers.menu.handleEvent(event))
				return;
			if (this._layers.main.handleEvent(event))
				return;
		}
		document.addEventListener('wheel', handleEvent.bind(this));
		document.addEventListener('pointerdown', handleEvent.bind(this));
		document.addEventListener('pointermove', handleEvent.bind(this));
		document.addEventListener('pointerup', handleEvent.bind(this));
		document.addEventListener('touchdown', handleEvent.bind(this));
		document.addEventListener('touchmove', handleEvent.bind(this));
		document.addEventListener('touchup', handleEvent.bind(this));
		document.addEventListener('click', handleEvent.bind(this));
		document.addEventListener('dblclick', handleEvent.bind(this));
		document.addEventListener('contextmenu', handleEvent.bind(this));

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
		if (this._deltaTime > 0.1)
			this._deltaTime = 0.1;

		// Calculate the 
		this._FPSTime += this._deltaTime;
		this._FPSCount++;
		if (this._FPSTime > 1) {
			this._FPSTime -= 1;
			this._FPSValue = this._FPSCount;
			this._FPSCount = 0;
			console.log(this._FPSValue);
		}


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

		let root = layer.viewport.app.data;

		switch (type) {
			case "Import": return new Dialog("Import", layer, "Import File...", [
				new FileInput("FileInput", null, "File: "),
				new Selector("FileType", null, "File Type: ", ["JSON", "OWL"]),
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
							let data = fileInput.fileData;
							switch (fileType.selectedOption) {
								case "JSON":
									JsonImporter.import(root, data);
									break;
								case "OWL":
									OwlImporter.import(root, data);
									break;
							}
						}
						catch (e) {
							console.error(e);
							Dialog.create("Error", layer, "Error", "Unable to import File.<br>" + e.message);
							return false;
						}
					}]),
			], new Background("ImportBackground", layer));
			case "Export": return new Dialog("Export", layer, "Export File...", [
				new Selector("FileType", null, "File Type: ", ["JSON", "OWL", "SCHEMA.JSON", "SQL",]),
			], [
				new Button("Cancel", null, "Cancel"),
				new Button("Export", null, "Export", [(button) => {
						let dialog = button.parent.parent;
						let fileType = dialog.contents[0];

						let ontology = layer.viewport.app.data.ontology;
						let data = "";
						switch (fileType.selectedOption) {
							case "JSON":
								data = JsonExporter.export(ontology);
								break;
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
			case "Info": return new Dialog("Info", layer, title, [new Text("ErrorMessage", null, message)], [new Button("OK", null, "OK")], new Background("ErrorBackground", layer));
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

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Graph class.
	 * @param name The widget name;
	 * @param parent The parent widget.*/
	constructor(name, parent) {

		// Call the base class constructor
		super(name, parent, createElement("canvas", parent.element, parent.name + "Canvas"));

		/** The translation vector. */
		this._translateX = 0;

		this._translateY = 0;

		/** The zoom level. */
		this._zoom = 0;

		/** The scale factor. */
		this._scale = 1;

		/** The elements to draw. */
		this._elements = {};

		// Create the canvas for the layer
		this._canvas = this._element;
		this._context = this._canvas.getContext('2d');

		this._basicStyle = new Style(null, null, { "name": "simple",
			shape: "circle", radius: "50",
			color: [255, 255, 255], border_width: "2", border_color: [0, 0, 255],
			text_color: [0, 0, 0], text_font: "Arial", text_size: "16px"
		});

	}

	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The elements of the layer. */
	// get elements(): Element[] { return this._elements; }

	set zoom(value) {

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
		let w = canvas.width = this.parent.element.clientWidth, h = canvas.height = this.parent.element.clientHeight;

		// Clean the background of the graph
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, w, h);

		// Translate and scale the graph
		ctx.translate(w / 2, h / 2);
		ctx.scale(this._scale, this._scale);
		ctx.translate(this._translateX, this._translateY);

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

			ctx.strokeStyle = 'grey';
			ctx.beginPath();
			ctx.moveTo(origin.x, origin.y);
			ctx.lineTo(target.x, target.y);
			ctx.stroke();
			ctx.fillStyle = "black";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = "Arial 12px";
			ctx.fillText(relation.name.value, (origin.x + target.x) / 2, (origin.y + target.y) / 2);
		}

		// Create the elements to draw
		this._elements = {};
		for (const c of o.classes.children) {
			let className = c.name.value;
			let element = new Element(className, c.positions.children[0], [this._basicStyle], className);
			this._elements[className] = element;
			element.draw(ctx);
		}

	}


	/** Handles an event.
	 * @param event The event data.
	 * @returns A boolean value indicating if the event was captured. */
	handleEvent(event) {

		switch (event.type) {
			case 'pointermove':
				let pointerEvent = event;
				if (pointerEvent.buttons == 1 || pointerEvent.buttons == 2) {
					this._translateX += pointerEvent.movementX / this._scale;
					this._translateY += pointerEvent.movementY / this._scale;
					// console.log(e.movementX + "," + e.movementY);
				}
				break;
			case 'wheel':
				let wheelEvent = event;

				// Get the point where the user is performing the action
				let c = this._canvas, w = c.width, h = c.height, x = wheelEvent.clientX - w / 2, y = wheelEvent.clientY - h / 2, previousScale = this._scale;

				// Calculate the new zoom level and scale factor
				let zoomDelta = ((wheelEvent.deltaY < 0) ? 1 : -1);
				this._zoom += zoomDelta;
				this._scale = Math.pow(1.5, this._zoom);
				console.log('Zoom: ' + (this._scale * 100).toFixed(0) + '%');

				// Transform the location between both scales
				this._translateX += -x / previousScale + x / this._scale;
				this._translateY += -y / previousScale + y / this._scale;

				break;

			case 'touchmove':
				let te = event;
				// if(te.button == 2) {
				console.log('touchmove');
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





// -------------------------------------------------- RESOURCE DATA 
SHISHO.resources = {
	"App": new Shape({ width: 512, height: 512, children: [
		new Shape({color: "#4facfe", path: "m 271.83223,123.93778 -88.90151,161.1114 7.69932,4.25201 88.9015,-161.1114 z m 17.22091,12.33414 -3.53519,8.05479 108.39002,47.62755 3.53519,-8.04697 z m 108.01308,57.60033 a 4.3966097,4.3966097 0 0 0 -0.13266,0.002 4.3966097,4.3966097 0 0 0 -4.08209,3.18949 l -19.97485,69.9208 a 4.3966097,4.3966097 0 0 0 3.01957,5.43366 4.3966097,4.3966097 0 0 0 5.43365,-3.01957 l 19.9827,-69.92275 a 4.3966097,4.3966097 0 0 0 -3.02741,-5.43171 4.3966097,4.3966097 0 0 0 -1.21876,-0.17189 z m -25.90071,90.50505 c -2.84772,0 -5.15632,2.41459 -5.15632,5.3946 0,2.98 2.3086,5.39654 5.15632,5.39654 2.8477,0 5.15631,-2.41654 5.15631,-5.39654 0,-2.98001 -2.30861,-5.3946 -5.15631,-5.3946 z m -192.09422,8.22666 a 4.3966097,4.3966097 0 0 0 -3.98833,2.58011 4.3966097,4.3966097 0 0 0 2.18558,5.82429 l 75.1865,34.15668 a 4.3966097,4.3966097 0 0 0 5.82428,-2.18557 4.3966097,4.3966097 0 0 0 -2.18557,-5.8243 l -75.1865,-34.15667 a 4.3966097,4.3966097 0 0 0 -1.66017,-0.39063 4.3966097,4.3966097 0 0 0 -0.17578,-0.004 z m 187.00431,12.66032 a 4.3966097,4.3966097 0 0 0 -0.13085,0.004 4.3966097,4.3966097 0 0 0 -4.08208,3.18168 l -16.80099,58.71948 -61.40312,-27.03548 a 4.3966097,4.3966097 0 0 0 -1.66213,-0.37698 4.3966097,4.3966097 0 0 0 -4.13286,2.627 4.3966097,4.3966097 0 0 0 2.25003,5.79499 l 62.50664,27.52381 -0.76368,2.66993 a 4.3966097,4.3966097 0 0 0 3.01957,5.4317 4.3966097,4.3966097 0 0 0 5.43366,-3.01954 l 0.43164,-1.50782 3.15629,1.39062 a 4.3966097,4.3966097 0 0 0 5.795,-2.25199 4.3966097,4.3966097 0 0 0 -2.25198,-5.79499 l -4.25787,-1.87501 17.13108,-59.87382 a 4.3966097,4.3966097 0 0 0 -3.01762,-5.44148 4.3966097,4.3966097 0 0 0 -1.22071,-0.166 z"}), 
		new Shape({color: "#ffffff", path: "m 132.51993,103.88675 -6.04695,11.44154 -12.44548,1.26956 8.53138,9.57824 -2.72661,12.76774 11.33803,-5.50788 10.77163,6.6114 -1.51174,-12.96695 9.36731,-8.67394 -12.28337,-2.5137 z m 129.47234,0.14064 -4.29108,23.84405 -21.19168,9.8302 20.35378,11.63882 2.37503,24.1546 16.87326,-16.66818 22.67607,5.08601 -9.93373,-21.92216 11.63492,-20.99049 -23.00029,3.07816 z m 125.61289,51.67057 -4.29301,23.8714 -21.21903,9.8302 20.35573,11.63882 2.37502,24.1253 16.87328,-16.63888 22.67605,5.086 -9.90638,-21.92215 11.63493,-21.01979 -23.0003,3.10746 z m -282.70276,33.67425 -3.18559,17.79711 -15.818559,7.31649 15.172069,8.67199 1.75393,18.02366 12.58023,-12.42984 16.926,3.7852 -7.39658,-16.35567 8.66612,-15.65059 -17.14279,2.31643 z m 62.19999,64.46566 -4.64458,25.93392 -23.08038,10.67786 22.137,12.65641 2.58988,26.24448 18.33032,-18.10766 24.64873,5.56453 -10.77161,-23.8714 12.63297,-22.82646 -24.9964,3.39068 z m 167.64469,83.13971 -4.40045,24.43784 -21.73074,10.05677 20.84011,11.92199 2.42971,24.71907 17.27757,-17.06467 23.21708,5.22662 -10.15052,-22.45925 11.90445,-21.49833 -23.54131,3.1641 z"})
	]}),
	"Options": new Shape({ width: 512, height: 512, children: [
		new Shape({path: "m 272.067,511.99962 h -32.13325 c -25.98923,0 -47.13461,-21.14423 -47.13461,-47.13458 v -10.87108 c -11.0491,-3.53001 -21.78413,-7.98615 -32.09697,-13.32286 l -7.70421,7.70421 c -18.6592,18.68186 -48.54817,18.13421 -66.66349,-0.008 L 63.623228,425.65766 C 45.474265,407.52874 44.952311,377.65 63.629275,358.99422 l 7.698162,-7.69816 C 65.990352,340.98322 61.535411,330.2501 58.004567,319.19912 H 47.134616 C 21.146514,319.19965 0,298.05564 0,272.06832 v -32.13399 c 0,-25.98922 21.145002,-47.13458 47.134616,-47.13458 h 10.869951 c 3.530995,-11.04985 7.986163,-21.78411 13.32287,-32.09695 l -7.703832,-7.70307 c -18.666003,-18.64595 -18.15123,-48.52923 0.006,-66.663434 l 22.71318,-22.711982 c 18.159165,-18.184099 48.041705,-18.638021 66.663485,0.006 l 7.69703,7.697024 c 10.31285,-5.335948 21.04825,-9.79202 32.09697,-13.322861 V 47.134581 C 192.80022,21.145364 213.94414,0 239.93489,0 h 32.13325 c 25.98923,0 47.13461,21.143853 47.13461,47.134581 v 10.871077 c 11.04911,3.53001 21.78413,7.986157 32.09697,13.32286 l 7.70384,-7.703826 c 18.6592,-18.681863 48.54816,-18.134209 66.66348,0.0072 l 22.71125,22.710092 c 18.14896,18.128916 18.67091,48.007656 -0.008,66.663436 l -7.69817,7.69816 c 5.33709,10.31284 9.79203,21.04596 13.32287,32.09695 h 10.86996 c 25.98923,0 47.13461,21.14423 47.13461,47.13458 v 32.13398 c 0,25.98922 -21.145,47.13458 -47.13461,47.13458 h -10.86996 c -3.53099,11.04985 -7.98616,21.78411 -13.32287,32.09695 l 7.70421,7.70382 c 18.66601,18.64596 18.15086,48.52923 -0.008,66.66344 l -22.71313,22.71198 c -18.15916,18.1841 -48.0417,18.63802 -66.66349,-0.008 l -7.69702,-7.69702 c -10.31285,5.33595 -21.04825,9.79202 -32.09697,13.32286 v 10.8715 C 319.1986,490.85615 298.05435,512 272.06398,512 Z M 165.71837,409.16981 c 14.32709,8.47296 29.74723,14.87399 45.83068,19.02505 6.62401,1.70903 11.25206,7.68304 11.25206,14.524 v 22.14807 c 0,9.44695 7.6872,17.13301 17.13415,17.13301 h 32.13326 c 9.44695,0 17.13415,-7.68606 17.13415,-17.13301 v -22.14807 c 0,-6.84096 4.62805,-12.8149 11.25207,-14.524 16.0842,-4.15106 31.50395,-10.55209 45.83067,-19.02505 5.89495,-3.48601 13.39997,-2.53803 18.24307,2.30499 l 15.68811,15.68885 c 6.76386,6.77217 17.62587,6.61494 24.22419,0.008 l 22.72712,-22.72597 c 6.58206,-6.57412 6.80203,-17.43802 0.008,-24.22493 l -15.69491,-15.69489 c -4.84197,-4.84197 -5.78988,-12.34812 -2.30499,-18.24193 8.47297,-14.32595 14.87286,-29.74607 19.02392,-45.83064 1.71002,-6.62401 7.68418,-11.25092 14.52401,-11.25092 h 22.14696 c 9.44695,0 17.13416,-7.68606 17.13416,-17.13301 v -32.13398 c 0,-9.44695 -7.68683,-17.13301 -17.13416,-17.13301 h -22.14696 c -6.84096,0 -12.81414,-4.62805 -14.52401,-11.25092 -4.15106,-16.08495 -10.55209,-31.50507 -19.02392,-45.83065 -3.48504,-5.89418 -2.53702,-13.39996 2.30499,-18.24192 l 15.68886,-15.68885 c 6.782,-6.77406 6.60512,-17.63418 0.008,-24.22493 L 404.45174,84.839449 c -6.58698,-6.596045 -17.45088,-6.789179 -24.22495,-0.006 L 364.53264,100.5283 c -4.84196,4.84309 -12.35002,5.791 -18.24307,2.30499 -14.3271,-8.472966 -29.74723,-14.873986 -45.83068,-19.025049 -6.62402,-1.708993 -11.25206,-7.683039 -11.25206,-14.523998 V 47.134279 c 0,-9.446948 -7.6872,-17.13301 -17.13416,-17.13301 h -32.13325 c -9.44695,0 -17.13415,7.686062 -17.13415,17.13301 v 22.148075 c 0,6.840958 -4.62805,12.814891 -11.25207,14.523997 -16.0842,4.151063 -31.50396,10.552084 -45.83067,19.025049 -5.89608,3.48499 -13.40111,2.53701 -18.24308,-2.30499 l -15.6881,-15.688851 c -6.76386,-6.772171 -17.62701,-6.614942 -24.22419,-0.0072 L 84.840041,107.55634 c -6.582065,6.57413 -6.802034,17.43689 -0.006,24.22493 l 15.694909,15.6949 c 4.84197,4.84196 5.78988,12.34812 2.30499,18.24193 -8.47297,14.32595 -14.872861,29.74607 -19.023927,45.83064 -1.710014,6.62401 -7.684179,11.25092 -14.524008,11.25092 H 47.134843 c -9.446955,0.001 -17.134157,7.68719 -17.134157,17.13414 v 32.13399 c 0,9.44694 7.687202,17.13301 17.134157,17.13301 H 69.2818 c 6.840964,0 12.814145,4.62804 14.524008,11.25092 4.151067,16.08494 10.552092,31.50507 19.023922,45.83064 3.485,5.89418 2.53702,13.39996 -2.30499,18.24192 l -15.688857,15.68885 c -6.782002,6.77406 -6.60512,17.63418 -0.006,24.22493 l 22.725227,22.72483 c 6.58698,6.59605 17.45089,6.78918 24.22495,0.008 L 147.47421,411.476 c 3.568,-3.56702 10.9909,-6.59416 18.24421,-2.30401 z"}), 
		new Shape({path: "m 256.00019,367.38705 c -61.42883,0 -111.40188,-49.97301 -111.40188,-111.40179 0,-61.42878 49.97305,-111.40179 111.40188,-111.40179 61.42883,0 111.40188,49.97301 111.40188,111.40179 0,61.42878 -49.97305,111.40179 -111.40188,111.40179 z m 0,-192.80164 c -44.88579,0 -81.39991,36.51598 -81.39991,81.39985 0,44.88387 36.51601,81.39985 81.39991,81.39985 44.8839,0 81.39991,-36.51598 81.39991,-81.39985 0,-44.88387 -36.51525,-81.39985 -81.39991,-81.39985 z"})
	]}),
	"Test": new Shape({ width: 512, height: 512, path: "M 256.00001,0 335.10835,168.53994 512,195.5666 384.00002,326.75665 414.2167,512 256,424.53995 97.783292,511.99996 127.99999,326.75665 1.4633393e-6,195.56658 176.89164,168.53994 Z"})
}