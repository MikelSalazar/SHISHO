import { Node } from '../../Node'
import { Measure } from "../Measure";

/** Defines a size (dimensional magnitude) measure. */
export class Size extends Measure {

	// ----------------------------------------------------- PUBLIC CONSTRUCTOR

	/** Initializes a new instance of the Size class.
	 * @param nodeName The name of the Node.
	 * @param nodeParent The parent Node.
	 * @param nodeData The initialization data. */
	 constructor(nodeName?: string, nodeParent?: Node, nodeData?: any) {

		// Call the parent class constructor
		super("size", nodeName, nodeParent, nodeData);

		// Deserialize the initialization data
		if (nodeData) this.deserialize(nodeData);
		if (this.unit) this.unit = "meters";
	}
}