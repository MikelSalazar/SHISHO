import { Node } from "../Node";

/** Defines a numeric Measure Node. */
export class Measure extends Node {

	// --------------------------------------------------------- PRIVATE FIELDS

	/** The current value of the Measure.*/
	private _value: number | undefined = undefined;

	/** The minimum possible value of Measure. */
	private _min: number = Number.NEGATIVE_INFINITY;

	/** The maximum possible value of the Measure. */
	private _max: number = Number.POSITIVE_INFINITY;

	/** The default value of the Measure. .*/
	private _default: number = 0;

	/** The measurement unit of the Measure. */
	private _unit: string | undefined = undefined;


	// ------------------------------------------------------- PUBLIC ACCESSORS

	/** The current value of the Measure.*/
	get value(): number | undefined { return this._value; }
	set value(newValue: number | undefined) {
		if (this._value != newValue) this.nodeUpdated = false;
		if (newValue == undefined) newValue = this._default;
		if (newValue < this._min) this._value = this._min;
		else if (newValue > this._max) this._value = this._max;
		else this._value = newValue;
		this.nodeUpdated = false;
	}


	/** The minimum possible value of Measure. */
	get min(): number { return this._min; }
	set min(newMin: number) {
		if (newMin > this._max) this._max = newMin;
		if (this._value && newMin > this._value) this.value = newMin;
		this._min = newMin; this.nodeUpdated = false;
	}


	/** The maximum possible value of the Measure. */
	get max(): number { return this._max; }
	set max(newMax: number) {
		if (newMax < this._min) this._min = newMax;
		if (this._value && this._value) this.value = newMax;
		this._max = newMax; this.nodeUpdated = false;
	}


	/** The default value of the Measure. */
	get default(): number { return this._default; }
	set default(newDefault: number) {
		this._default = newDefault; this.nodeUpdated = false;
	}


	/** Gets the measurement unit of the Measure. */
	get unit(): string | undefined { return this._unit; }
	set unit(newUnit: string | undefined) {
		this._unit = newUnit; this.nodeUpdated = false;
	}


	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Measure class.
	 * @param nodeType The type of the Node.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeType: string, nodeName?: string, nodeParent?: Node,
		nodeData?: any) {

		// Call the parent class constructor
		super(nodeType || "measure", nodeName, nodeParent, nodeData);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
	}


	// --------------------------------------------------------- PUBLIC METHODS

	/** Serializes the Number instance.
	 * @return The serialized data. */
	serialize(): any { return this._value; }


	/** Deserializes the Number instance.
	 * @param data The data to deserialize.
	 * @param mode The deserialization mode. */
	 deserialize(data: any, mode?: string) {
		if (typeof data !== "number") data = parseFloat(data);
		this.value = data;
	}

	/** Obtains the calculate value. 
	 * @returns The calculated value; */
	get(): number | undefined {	return this.value; }
}