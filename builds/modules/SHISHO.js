import { Root } from "./data/model/Root.js";
import { Viewport } from "./view/Viewport.js";
import { Dialog } from "./view/widgets/Dialog.js";

/** Defines the main class of the SHISHO Knowledge Management System. */
export class SHISHO {


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
export default SHISHO;
