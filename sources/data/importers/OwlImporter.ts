import { Class } from "../model/Class";
import { Ontology } from "../model/Ontology";
import { Relation } from "../model/Relation";
import { Vector } from "../model/Vector";

/** Manages the importain of ontologies from OWL files. */
export class OwlImporter {

	// ------------------------------------------------------------ CONSTRUCTOR

	/** Imports the data from a OWL file
	 * @param ontology The ontology to import data to.
	 * @param data The data of the ontology.
	 * @param replace Whether to replace (default) or append the new data). */
	constructor(ontology: Ontology, data: string, replace: boolean = true) {

		// Parse the data string
		let parser = new DOMParser();
		let xmlDoc: XMLDocument = parser.parseFromString(data, "text/xml");

		// Find the main node of the OWL file
		let mainNode: Element = null;
		for (let element of (xmlDoc.getRootNode() as Element).children)
			if (element.nodeName == "rdf:RDF") mainNode = element;
		if (!mainNode) throw new Error("Invalid OWL File. ");


		// Clean the previous ontology data
		if (replace) ontology.deserialize();

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
					if (className) newClass = new Class({ name: className });
					else throw Error("Class name not defined");

					// Check if there is a class defining the position
					let x = this.findElement('entityPositionX', element);
					let y = this.findElement('entityPositionY', element);
					newClass.positions = [new Vector({
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
					let origin: Element = this.findElement('domain', element);
					let target: Element = this.findElement('range', element);
					let originName = this.extractName(origin.attributes[0]);
					let targetName = this.extractName(target.attributes[0]);
					newProperty = new Relation({name: propertyName,
						origin: originName, target: targetName});
					ontology.relations[propertyName] = newProperty;
					console.log("Relation:" + propertyName);
					break;
			}
		}

		// Check the relations
		Object.keys(ontology.relations).forEach(relationName => {
			let relation: Relation = ontology.relations[relationName];
			if (!ontology.classes[relation.origin]) throw Error(
				"Class not defined: '" + relation.origin +
				"' in relation '" + relationName + "'");
			if (!ontology.classes[relation.target]) throw Error(
				"Class not defined: '" + relation.target +
				"' in relation '" + relationName + "'");

		});
	}


	// --------------------------------------------------------- PUBLIC METHODS

	getName(element: Element) {
		let name, className = null;
		for (let attribute of element.attributes) {
			switch (attribute.name.toLowerCase()) {
				case "rdf:id": return attribute.textContent;
				case "rdf:about": name = this.extractName(attribute); break;
			}
		}
		return name;
	}

	extractName(node: Node) { return node.textContent.split('#')[1]; }


	/** Looks recursively for an element with a particular name  */
	findElement(name, start: Element): Element {
		let elements = [start];
		while (elements.length > 0) { // Depth first search
			let element = elements.pop();
			if (element.nodeName.includes(name)) return element;
			elements.push(...element.children);
		}
		return null;
	}
}