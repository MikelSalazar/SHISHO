import { OwlImporter } from "../../data/importers/OwlImporter.js";
import { createElement } from "../Viewport.js";
import { Widget } from "../Widget.js";
import { Background } from "./Background.js";
import { Button } from "./Button.js";
import { FileInput } from "./FileInput.js";
import { Text } from "./Text.js";
import { Selector } from "./Selector.js";
import { JsonSchemaExporter } from "../../data/exporters/JsonSchemaExporter.js";
import { OwlExporter } from "../../data/exporters/OwlExporter.js";
import { SqlExporter } from "../../data/exporters/SqlExporter.js";
import { JsonExporter } from "../../data/exporters/JsonExporter.js";
import { JsonImporter } from "../../data/importers/JsonImporter.js";

/** Defines a dialog window. */
export class Dialog extends Widget {


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
			case "Error": return new Dialog("Error", layer, title, [new Text("ErrorMessage", null, message)], [new Button("OK", null, "OK")], new Background("ErrorBackground", layer));
		}
	}
}

