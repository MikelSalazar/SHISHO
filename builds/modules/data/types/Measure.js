import { Node } from "../Node.js";

/** Defines a numeric Measure Node. */
export class Measure extends Node {


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Measure class.
	 * @param nodeType The type of the Node.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	constructor(nodeType, nodeName, nodeParent, nodeData) {

		// Call the parent class constructor
		super(nodeType || "measure", nodeName, nodeParent, nodeData);

		// --------------------------------------------------------- PRIVATE FIELDS

		/** The current value of the Measure.*/
		this._value = undefined;

		/** The minimum possible value of Measure. */
		this._min = Number.NEGATIVE_INFINITY;

		/** The maximum possible value of the Measure. */
		this._max = Number.POSITIVE_INFINITY;

		/** The default value of the Measure. .*/
		this._default = 0;

		/** The measurement unit of the Measure. */
		this._unit = undefined;

		// Deserialize the initialization data
		if (nodeData)
			this.deserialize(nodeData);
	}


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the Measure.*/
	get value() { return this._value; }
	set value(newValue) {
		if (this._value != newValue)
			this.nodeUpdated = false;
		if (newValue == undefined)
			newValue = this._default;
		if (newValue < this._min)
			this._value = this._min;
		else if (newValue > this._max)
			this._value = this._max;
		else
			this._value = newValue;
		this.nodeUpdated = false;
	}


	/** The minimum possible value of Measure. */
	get min() { return this._min; }
	set min(newMin) {
		if (newMin > this._max)
			this._max = newMin;
		if (this._value && newMin > this._value)
			this.value = newMin;
		this._min = newMin;
		this.nodeUpdated = false;
	}


	/** The maximum possible value of the Measure. */
	get max() { return this._max; }
	set max(newMax) {
		if (newMax < this._min)
			this._min = newMax;
		if (this._value && this._value)
			this.value = newMax;
		this._max = newMax;
		this.nodeUpdated = false;
	}


	/** The default value of the Measure. */
	get default() { return this._default; }
	set default(newDefault) {
		this._default = newDefault;
		this.nodeUpdated = false;
	}


	/** Gets the measurement unit of the Measure. */
	get unit() { return this._unit; }
	set unit(newUnit) {
		this._unit = newUnit;
		this.nodeUpdated = false;
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the Number instance.
	 * @return The serialized data. */
	serialize() { return this._value; }


	/** Deserializes the Number instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	deserialize(data, mode) {
		if (typeof data !== "number")
			data = parseFloat(data);
		this.value = data;
	}

	/** Obtains the calculate value.
	 * @returns The calculated value; */
	get() { return this.value; }
}
