import { Root } from "./data/model/Root";
import { Viewport } from "./view/Viewport";
import { Dialog } from "./view/widgets/Dialog";

/** Defines the main class of the SHISHO Knowledge Management System. */
export class SHISHO {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The list of SHISHO App instances. */
	private static _instances: SHISHO[] = [];

	/** The app instance number. */
	private _instanceNumber: number;

	/** The app instance string. */
	private _instanceString: string;
	
	/** The viewports of the app. */
	private _viewports: Viewport[] = [];

	/** The data of the app. */
	private _data: Root;

	/** The HTML element ontology data. */
	private _dataElement: Element;

	/** Whether to save the data to the element or not. */
	private _saveToElement: boolean;

	/** The url of the ontology data. */
	private _url: string;

	/** Whether to save the data to. */
	private _saveToUrl: boolean;


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The SHISHO app name. */
	static get AppName(): string { return "SHISHO"; }

	/** The SHISHO app version number. */
	static get AppVersion(): string { return "0.4.1"; }

	/** The SHISHO app instances. */
	static get instances(): SHISHO[] { return this._instances; }

	/** The viewports of the app. */
	get viewports(): Viewport[] { return this._viewports; }

	/** The data of the app. */
	get data(): Root { return this._data; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new SHISHO App instance.
	 * @param {*} params The initialization parameters. */
	 constructor(params: any = {}) {

		// Adds the instance to the static array
		let iN = this._instanceNumber = SHISHO.instances.length;
		let iS = this._instanceString = "ShishoApp" + ((iN > 0)? iN : "");
		SHISHO.instances.push(this);

		// Create an empty ontology
		this._data = new Root({ name: "unnamed_ontology" });

		// Create a new viewport
		this.viewports.push(new Viewport(this, params));

		// Get the data from the parameters
		if (params.data) { 
			if (typeof params.dataElement === 'string') {
				this._dataElement = document.getElementById(params.dataElement);
				if (!this._dataElement) throw new Error("Invalid data element");
			} else this._dataElement = params.dataElement;
		} else this._dataElement = document.getElementById(iS + "Data");
		this.deserialize(params.data);
	
		// Show a message on console
		console.log(SHISHO.AppName + " " + SHISHO.AppVersion + " Initialized");
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Initializes a new SHISHO app (without having to use the "new" keyword).
	* @param {*} params The initialization parameters. 
	* @returns The new App instance. */
	static init(params):SHISHO { return new SHISHO(params); }

	
	/** Loads the SHISHO data.
	 * @param data The data to load. */
	 deserialize(data?: any) {

		// If there is no data, try to get it from other sources
		if (!data) {
			if (this._dataElement) data = this._dataElement.textContent;
		}

		// Analyze the data
		try { 
			// Try to parse string data
			if (typeof data == 'string') {
				let start = data.indexOf('{'), end = data.lastIndexOf('}');
				if (start < 0 || end < 0) throw new Error("Invalid JSON data");
				let jsonData = data.slice(start, end+1)
				data = JSON.parse(jsonData);
			}

			// Deserialize the app data
			this._data.deserialize(data);

		} catch (e) {
			Dialog.create("Error", this._viewports[0].layers.dialog, "Error", 
				"Unable to load data.<br>" + e.message);
			return false;
		}
	}


	/** Saves the app data. */
	serialize() {
		
		// Create the JSON data
		let data : string ="";

		// Check if we have to save the data into an HTML element
		if (this._saveToElement) {
			// If the element doesn't exist, create it
			if (!this._dataElement) {
				this._dataElement = document.createElement('script')
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

// Set the default class to export
export default SHISHO;