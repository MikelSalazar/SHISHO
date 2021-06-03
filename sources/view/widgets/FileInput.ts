import { createElement } from "../Viewport";
import { Widget } from "../Widget";

/** Provides a way to input the URI of a file. */
export class FileInput extends Widget {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The text of the input element. */
	private _label: string;

	/** The HTML element for the label. */
	private _labelElement : HTMLElement;

	/** The HTML element for the input. */
	private _inputElement : HTMLInputElement;

	/** The name of the selected file. */
	private _fileName : string;

	/** The path of the selected file. */
	private _filePath : string;

	/** The data of the selected file. */
	private _fileData : string;


	// ------------------------------------------------------ PUBLIC PROPERTIES
	
	/** The name of the selected file. */
	get fileName():string { return this._fileName; }

	/** The data of the selected file. */
	get filePath():string { return this._filePath; }

	/** The data of the selected file. */
	get fileData():string { return this._fileData; }


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new instance of the FileInput class.
	 * @param name The widget name;
	 * @param parent The parent widget.
	 * @param label The label of the widget. */
	constructor(name:string, parent:Widget, label: string) {

		// Call the base class constructor
		super(name, parent);

		// Store the given parameters
		this._label = label;

		// Create the element
		let parentElement = (parent && parent.element)? parent.element: null;
		this._element = createElement("p", parentElement, name);

		// Create the label element
		this._labelElement = createElement("label", this._element, 
			name + "Label", null, null, null, label);
		
		// Create the input file
		this._inputElement = createElement("input", this._element, 
			name + "Input",) as HTMLInputElement;
		this._inputElement.type = "file";

		// When a file is selected, try to load it
		this._inputElement.onchange = (e:any) => {

			// Get the file metadata
			let file = e.target.files[0]; 
			this._fileName = file.name;
			this._filePath = file.path;

			//TODO: Add a Loading message 

			// Create a reader
			let reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			reader.onload = readerEvent => {
				this._fileData = readerEvent.target.result.toString();
			}
		}
	}
}