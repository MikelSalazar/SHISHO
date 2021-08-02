import { OwlImporter } from "../../data/importers/OwlImporter";
import { Layer } from "../Layer";
import { createElement } from "../Viewport";
import { Widget } from "../Widget";
import { Background } from "./Background";
import { Button } from "./Button";
import { FileInput } from "./FileInput";
import { Label } from "./Label";
import { Text } from "./Text";
import { Selector } from "./Selector";
import { Ontology } from "../../data/model/Ontology";
import { JsonSchemaExporter } from "../../data/exporters/JsonSchemaExporter";
import { OwlExporter } from "../../data/exporters/OwlExporter";
import { SqlExporter } from "../../data/exporters/SqlExporter";

/** Defines a dialog window. */
export class Dialog extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The background of the dialog window. */
	private _background: Background;

	/** The title of the dialog window. */
	private _title: string;

	/** The element with the title of the dialog window. */
	private _titleGroup: Widget;

	/** The contents of the dialog window. */
	private _contents: Widget[];

	/** The element with the title of the dialog window. */
	private _contentsGroup: Widget;

	/** The buttons at the bottom of the dialog window. */
	private _buttonGroup: Widget;

	/** The buttons at the bottom of the dialog window. */
	private _buttons: Button[];


	// ------------------------------------------------------ PUBLIC PROPERTIES

	/** The background of the dialog window. */
	get background(): Background { return this._background; }

	/** The title of the dialog window. */
	get title(): string { return this._title; }

	/** The contents of the dialog window. */
	get contents(): Widget[] { return this._contents; }

	/** The buttons at the bottom of the dialog window. */
	get buttons(): Widget[] { return this._buttons; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the Dialog class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param title The title of the dialog window.
	 * @param contents The contents of the dialog window.
	 * @param buttons The buttons of the dialog window. */
	constructor(name: string, parent: Widget, title: string, 
		contents: Widget[], buttons:Button[], background: Background) {

		// Call the base class constructor
		super(name, parent);

		// Remove when hidden
		this._removeIfHidden = true;

		// Store the given parameters
		this._title = title; 
		this._contents = contents; this._buttons = buttons;
		this._background = background;

		// Create the different elements
		let parentElement = (parent && parent.element)? parent.element: null;
		if (this.background) parentElement = background.element;
		
		// Create the element of the dialog
		this._element = createElement("div", parentElement, name, null, 
			"ShishoWindow");

		// Create the title of the dialog
		this._titleGroup = new Widget("TitleGroup", this, createElement(
			"div", this._element, name + title, null,
			"ShishoWindowTitle", null, this._title));
		
		// Create the title of the dialog
		this._contentsGroup = new Widget("ContentsGroup", this, createElement(
			"div", this._element, name + title, null, 
			"ShishoWindowContents"));

		// Add the contents
		for(let content of this._contents) content.parent = this._contentsGroup;

		// Create the Button Group
		this._buttonGroup = new Widget("ButtonGroup", this, createElement(
			"div", this._element, name + "Buttons", null, 
			"ShishoWindowButtonGroup"));

		// Add the button and add a callback to hide the dialog
		for(let button of this._buttons) {
			button.parent = this._buttonGroup;
			button.callbacks.push(()=> { 
				this.hide(); 
				if(this._background) this._background.hide();
			});
		}
	}

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
	static create(type: string, layer: Layer, title: string = null, 
		message: string = null): Dialog {

		switch (type) {
			case "Import": return new Dialog("Import", layer, "Import File...", 
				[
					new FileInput("FileInput", null, "File: "),
					new Selector("FileType", null, "File Type: ", ["OWL", "JSON"]),
				],[
					new Button("Cancel", null, "Cancel"),
					new Button("Import", null, "Import",
					[(button:Button) => {
						let dialog: Dialog = button.parent.parent as Dialog;
						let fileInput = dialog.contents[0] as FileInput;
						let fileType: Selector = dialog.contents[1] as Selector;

						console.log(fileInput.filePath);

						try { // to load the ontology
							if (fileInput.filePath == null) 
								throw Error("No file provided.");
							new OwlImporter(layer.viewport.app.data.ontology,
								fileInput.fileData);
						} 
						catch (e) {
							console.error(e);
							Dialog.create("Error", layer, "Error", 
								"Unable to import File.<br>" + e.message);
							return false;
						}
				}]),
				], new Background("ImportBackground", layer));
			case "Export": return new Dialog("Export", layer, "Export File...", 
				[
					new Selector("FileType", null, "File Type: ", 
						["OWL", "SCHEMA.JSON", "SQL", "JS Code"]),
				],[
					new Button("Cancel", null, "Cancel"),
					new Button("Export", null, "Export",
					[(button:Button) => {
						let dialog: Dialog = button.parent.parent as Dialog;
						let fileType: Selector = dialog.contents[0] as Selector;

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
			case "Error": return new Dialog("Error", layer, title, 
					[new Text("ErrorMessage", null, message)],
					[new Button("OK", null, "OK")], 
				new Background("ErrorBackground", layer));
		}
	}
}
