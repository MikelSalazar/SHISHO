import { Class } from "../model/Class.js";
import { Relation } from "../model/Relation.js";
import { Vector } from "../types/complex/Vector.js";

/** Manages the importation of ontologies from OWL files. */
export class OwlImporter {

	// --------------------------------------------------------- PUBLIC METHODS

	/** Imports the data from a OWL file
	 * @param root The root of the SHISHO data model.
	 * @param data The JSON file data.
	 * @param combine Whether to combine (default) or append the new data). */
	static import(root, data, combine = true) {

		// Parse the data string
		let parser = new DOMParser();
		let xmlDoc = parser.parseFromString(data, "text/xml");

		// Find the main node of the OWL file
		let mainNode = null;
		for (let element of xmlDoc.getRootNode().children)
			if (element.nodeName == "rdf:RDF")
				mainNode = element;
		if (!mainNode)
			throw new Error("Invalid OWL File. ");

		// Operate in the ontology
		let ontology = root.ontology;

		// Clean the previous ontology data
		if (!combine)
			ontology.deserialize();

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
					if (className)
						newClass = new Class("className", ontology, { name: className });
					else
						throw Error("Class name not defined");

					// Check if there is a class defining the position
					let x = this.findElement('entityPositionX', element);
					let y = this.findElement('entityPositionY', element);
					newClass.positions = [new Vector("position", newClass, {
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
					let origin = this.findElement('domain', element);
					let target = this.findElement('range', element);
					let originName = this.extractName(origin.attributes[0]);
					let targetName = this.extractName(target.attributes[0]);
					newProperty = new Relation(propertyName, ontology, { name: propertyName,
						origin: originName, target: targetName });
					ontology.relations[propertyName] = newProperty;
					console.log("Relation:" + propertyName);
					break;
			}
		}

		// Check the relations
		Object.keys(ontology.relations).forEach(relationName => {
			let relation = ontology.relations[relationName];
			if (!ontology.classes[relation.origin.value])
				throw Error("Class not defined: '" + relation.origin +
					"' in relation '" + relationName + "'");
			if (!ontology.classes[relation.target.value])
				throw Error("Class not defined: '" + relation.target +
					"' in relation '" + relationName + "'");

		});
	}



	static getName(element) {
		let name, className = null;
		for (let attribute of element.attributes) {
			switch (attribute.name.toLowerCase()) {
				case "rdf:id": return attribute.textContent;
				case "rdf:about":
					name = this.extractName(attribute);
					break;
			}
		}
		return name;
	}

	static extractName(node) { return node.textContent.split('#')[1]; }


	/** Looks recursively for an element with a particular name  */
	static findElement(name, start) {
		let elements = [start];
		while (elements.length > 0) { // Depth first search
			let element = elements.pop();
			if (element.nodeName.includes(name))
				return element;
			elements.push(...element.children);
		}
		return null;
	}
}
