import SHISHO from "../SHISHO.js";
import { DialogLayer } from "./layers/DialogLayer.js";
import { MainLayer } from "./layers/MainLayer.js";
import { MenuLayer } from "./layers/MenuLayer.js";
import { DebugLayer } from "./layers/DebugLayer.js";
import { Dialog } from "./widgets/Dialog.js";

/** Defines a viewport. */
export class Viewport {


	// ------------------------------------------------------------ CONSTRUCTOR

	/** Initializes a new Viewport instance.
	 * @param app The associated App instance.
	 * @param {*} params The initialization parameters. */
	constructor(app, params = {}) {

		/** The layers of the viewport. */
		this._layers = {};

		/** The last update time. */
		this._updateTime = 0;

		/** The time since the last update. */
		this._deltaTime = 0;

		/** The current FPS time counter. */
		this._FPSTimeCounter = 0;

		/** The current FPS frame counter. */
		this._FPSFrameCounter = 0;

		/** The last FPS value. */
		this._FPS = 0;

		/** Indicates whether to force updates or to wait for changes. */
		this._forcedUpdates = false;

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
			createCssRule(".ShishoDebugFPSLabel", "font-family: Arial, Helvetica, sans-serif; font-size: 2vmin; color: red");
		}

		// Create the wrapper for the rest of the elements
		this._element = createElement("div", this._parentElement, "ShishoViewport" + instanceNumber, null, "ShishoViewport");

		// document.addEventListener('keyup', logKey);
		// window.addEventListener('resize', (e)=>);


		// Create the layers of the user interface
		let main = this._layers.main = new MainLayer(this);
		let menu = this._layers.menu = new MenuLayer(this);
		let dialog = this.layers.dialog = new DialogLayer(this);
		let debug = this.layers.debug = new DebugLayer(this);

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
		// this.update(0);
		requestAnimationFrame(this.update.bind(this));
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

	/** The width of the viewport. */
	get width() { return this._element.clientWidth; }

	/** The height of the viewport. */
	get height() { return this._element.clientHeight; }

	/** The last update time. */
	get updateTime() { return this._updateTime; }

	/** The time since the last update. */
	get deltaTime() { return this._deltaTime; }

	/** The time since the last update. */
	get FPS() { return this._FPS; }

	// --------------------------------------------------------- PUBLIC METHODS

	/** Updates the viewport.
	 * @param time The current time (milliseconds from beginning). */
	update(time = 0) {

		// Calculate the current delta time
		let timeInSeconds = (time > 0) ? time / 1000 : 0.001;
		this._deltaTime = timeInSeconds - this._updateTime;
		this._updateTime = timeInSeconds;
		if (this._deltaTime > 0.1)
			this._deltaTime = 0.1;

		// Calculate the Frames Per Second
		this._FPSTimeCounter += this._deltaTime;
		this._FPSFrameCounter++;
		if (this._FPSTimeCounter > 1) {
			this._FPSTimeCounter -= 1;
			this._FPS = this._FPSFrameCounter;
			this._FPSFrameCounter = 0;
		}

		// Update the layers
		for (const layer in this._layers) {
			this._layers[layer].update(this._deltaTime, this._forcedUpdates);
		}


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
export function createElement(tag, parent, id = null, name = null, className = null, style = null, text = null) {
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
export function createCssRule(selectorText, styleText, override = false) {
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

