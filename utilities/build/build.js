// ----------------------------------------------------------------------------
// SHISHO - Build System 
// ----------------------------------------------------------------------------

// Require the necessary Nodejs packages
const path = require("path"), 			// File Path handling
	fs = require("fs"),					// File System access
	parser = require('xml-js'),			// XML Data parser
	exec = require('child_process');	// External command execution

//------------------------------------------------------------ GLOBAL FUNCTIONS

/** Calculates the relative path between two absolute paths.
 * @param from The origin path.
 * @param to The destination path.
 * @returns The relative path. */
function relativePath(from,to) {
	return path.relative(from,to).replace(/\\/g,'/');
}


/** Makes sure that the parent directory exists. 
 * @param folderPath The path of the directory (or file) to check.
 * @returns A boolean value indicating whether the parent directory existed. */
function checkFolderStructure(folderPath) {
	if (fs.existsSync(folderPath)) return true;
	checkFolderStructure(path.dirname(folderPath));
	fs.mkdirSync(folderPath);
	return false;
}


/** Recursively cleans a folder .
 * @param folderPath The path of the folder to clean. 
 * @param removeFolder Whether to remove the folder afterwards or not. */
function cleanFolder(folderPath, removeFolder = false) {
	var filePaths = fs.readdirSync(folderPath);
	filePaths.forEach(filePath => {
		filePath = path.join(folderPath, filePath);
		if (fs.lstatSync(filePath).isFile()) fs.unlinkSync(filePath);
		else cleanFolder(filePath, true);
	});
	if(removeFolder) fs.rmdirSync(folderPath);
}


/** Recursively finds the files inside a folder
 * @param folderPath The path to the folder.
 * @param originalPath The relative path for the file folder. */
function findFilesInFolder(folderPath, originalPath = null) {
	let pathsInFolder = fs.readdirSync(folderPath), files = [];
	if (!originalPath) originalPath = folderPath;
	for (let pathInFolder of pathsInFolder) {
		pathInFolder = path.join(folderPath, pathInFolder);
		if(fs.statSync(pathInFolder).isDirectory()) 
			files.push(... findFilesInFolder(pathInFolder, originalPath));
		else files.push(relativePath(sourcesFolderPath, pathInFolder));
	}
	return files;
}



//------------------------------------------------------------ GLOBAL VARIABLES
let projectName = "SHISHO";
let mainFileName = "SHISHO";
let outputFileName = "shisho";
let rootFolderPath = path.resolve(__dirname, '..\\..\\').replace(/\\/g,'/')+'/';
let sourcesFolderPath = rootFolderPath + "sources/";
let resourcesFolderPath = rootFolderPath + "resources/";
let outputFolderPath = rootFolderPath + "builds/";
let temporalFolderPath = outputFolderPath + "temporal/";
let modulesFolderPath = outputFolderPath + "modules/";
let outputFilePath = outputFolderPath + outputFileName;
let sourceFiles = [], resourceFiles = [];

//----------------------------------------------------------------- ENTRY POINT

// Obtain the root node
console.log("Building at: " + rootFolderPath);

// Clean the output folder
console.log('Cleaning the output folder...');
cleanFolder(outputFolderPath, false);

// Identify the source files
console.log('Identifying source files...');
sourceFiles = findFilesInFolder(sourcesFolderPath);

// Identify the resource files
console.log('Identifying resource files...');
resourceFiles = findFilesInFolder(resourcesFolderPath);

// Create a temporal copy of the files and prepare them for transpilation
console.log('Preprocessing source files...');
let codebase = {}, fileIndex, fileCount = sourceFiles.length;
for (fileIndex = 0; fileIndex < fileCount; fileIndex++) {
	let filePath = sourceFiles[fileIndex];
	let tsFilePath = sourcesFolderPath + filePath;
	let temporalFilePath = temporalFolderPath + filePath;
	let data = fs.readFileSync(tsFilePath, 'utf8');
	let lines = data.split("\n"), lineIndex, lineCount = lines.length;
	for (lineIndex = 0; lineIndex < lineCount; lineIndex++) {
		let line = lines[lineIndex];
		// Add a special comment in empty lines
		if (line.trim().length == 0) lines[lineIndex] = "////";
	
		// Get the name of the class (and the one it extends)
		if (line.includes("export ") && line.includes("class ")) {
			let words = line.split(' ');
			let className = words[words.indexOf('class')+1];
			let superClassName = (words.indexOf('extends')<0)? null: 
				words[words.indexOf('extends')+1];
			codebase[className] = {filePath: filePath, extends: superClassName};
		}
	}
	checkFolderStructure(path.dirname(temporalFilePath));
	fs.writeFileSync(temporalFilePath, lines.join("\n"), 'utf8');
}

// Reorder the files paths in case there is a class that extends another
let orderedFilePaths = [mainFileName +  '.ts']; // Put the main file fist
function checkClassOrder(className) {
	if (codebase[className].extends) // The extended class must come before
		checkClassOrder(codebase[className].extends);
	if (!orderedFilePaths.includes(codebase[className].filePath))
		orderedFilePaths.push(codebase[className].filePath);
}
for(let className in codebase) checkClassOrder(className);

// If there is any remaining file path, add it to the end 
for(let filePath of sourceFiles) 
	if(!orderedFilePaths.includes(filePath)) 
		orderedFilePaths.push(filePath);

// Replace the original array with the ordered version
sourceFiles = orderedFilePaths;

// Transpile the TypeScript code to Javascript
// https://www.typescriptlang.org/docs/handbook/compiler-options.html
console.log('Transpiling source files...');
let command = 'tsc' +
	' --target ES6' +
	' --moduleResolution node' +
	' --rootDir "."' +
	' --outDir "' + path.relative(temporalFolderPath, modulesFolderPath) + '"' +
	' "' + sourceFiles.join('" "') + '"';
// console.log(command);
// try { 
	exec.execSync(command, { cwd: temporalFolderPath, stdio: 'inherit'});
// } catch (e) { console.error("Unable to transpile!!"); throw (e); }
	
// Remove the temporal folder
cleanFolder(temporalFolderPath, true);

// Clean the result of the transpilation (due to interconnections between 
// modules, all the files in the modules folder need to be processed)
console.log('Postprocessing output files...');
let combinedLines = [];
for (fileIndex = 0; fileIndex < fileCount; fileIndex++) {
	let filePath = sourceFiles[fileIndex];
	console.log("Processing: " + filePath);
	let moduleFilePath = modulesFolderPath + filePath.replace('.ts','.js');
	let data = fs.readFileSync(moduleFilePath, 'utf8');
	let lines = data.split("\r\n"), lineIndex, lineCount = lines.length;
	for (lineIndex = 0; lineIndex < lineCount; lineIndex++) {
		let line = lines[lineIndex].trim();
		// Remove special comments
		if (line == "////") lines[lineIndex] = '';
		// Process imports/exports
		else if (line.startsWith('import ') || line.startsWith('export ')) {
			// Get the path from the section between single or double quotes
			let s = '"', filePathEnd = line.lastIndexOf(s);
			if (filePathEnd < 0) filePathEnd = line.lastIndexOf(s="'");
			if (filePathEnd < 0) continue;
			let filePathStart = line.lastIndexOf(s, filePathEnd - 1);
			if (filePathStart < 0) throw Error("No file path detected");

			// Remove the quotes
			let filePath = line.substring(filePathStart + 1, filePathEnd);

			// Remove global imports (preserving the number of characters)
			if (!filePath.startsWith(".")) lines[lineIndex] = '';
			else if (!filePath.endsWith('.js')) 
				lines[lineIndex] = line.slice(0, filePathEnd) + '.js' +
					line.slice(filePathEnd);
		}
		// Convert spaces to tabs
		else {
			let spaces = 0, tabs = 0, spacesInTab = 4;
			while (lines[lineIndex][spaces] == ' ') spaces++;
			tabs = Math.floor(spaces / spacesInTab);
			if (tabs > 0) lines[lineIndex] = '\t'.repeat(tabs) +
				lines[lineIndex].slice(tabs * spacesInTab);
		}
	}

	// Add the lines to the combined list
	combinedLines.push(...lines);

	// Recombine the data and save the files
	fs.writeFileSync(moduleFilePath, lines.join("\n") , 'utf8');
}


// Remove import declarations for the combined module
let lineIndex, lineCount = combinedLines.length;
for (lineIndex = 0; lineIndex < lineCount; lineIndex++) {
	let line = combinedLines[lineIndex], l = line.trim();
	if (l.startsWith('import ')) combinedLines[lineIndex] = "";
}

// Add the resources to the main file
let resourceData = "// --------------------------------------------------" +
	" RESOURCE DATA \n" + mainFileName + ".resources = {\n"  ; 
fileCount = resourceFiles.length;
for (fileIndex = 0; fileIndex < fileCount; fileIndex++) {
	if (fileIndex > 0) resourceData += ',\n';
	let resourceFile = resourceFiles[fileIndex];
	let fileName = path.parse(resourceFile).name,
		fileExt = path.extname(resourceFile),
		fileData = fs.readFileSync(resourcesFolderPath + resourceFile, 'utf8');
	switch (fileExt) {
		case '.svg': // SVG files
			// Get the shape data
			// let widthStart = fileData.indexOf('width="') + 7,
			// 	widthEnd = fileData.indexOf('"', widthStart),
			// 	width = fileData.substring(widthStart, widthEnd),
			// 	heightStart = fileData.indexOf('height="') + 8,
			// 	heightEnd = fileData.indexOf('"', heightStart),
			// 	height = fileData.substring(heightStart, heightEnd),
			// 	paths = [], pathStart = fileData.indexOf(" d=\"") + 4, pathEnd;
			// while (pathStart > 3) {
			// 	pathEnd = fileData.indexOf('"', pathStart);
			// 	paths.push(fileData.substring(pathStart, pathEnd));
			// 	pathStart = fileData.indexOf(" d=\"", pathEnd) + 4;
			// }

			// Get the SVG root
			let svg = parser.xml2js(fileData).elements[0], paths = []
			let width = parseInt(svg.attributes["width"]);
				height = parseInt(svg.attributes["height"]);
			
			// Parse the elements
			function parseSVGElement (element) {
				element.elements.forEach(child => {
					if(child.name == "path") {
						let path = {};
						path.name = child.attributes["id"];
						path.fill = child.attributes["fill"];
						path.d = child.attributes["d"];
						paths.push(path);
					}	
					if(child.name == "g") parseSVGElement(child);
				});
			}
			parseSVGElement(svg);


			let pathIndex, pathCount = paths.length, shapeData = 
				"new Shape({ width: " + width + ", height: " + height + ", " ;
			if (pathCount > 1) {
				shapeData += 'children: [';
				for (pathIndex = 0; pathIndex < pathCount; pathIndex++) {
					let path = paths[pathIndex];
					if (pathIndex > 0) shapeData += ', ';
					shapeData += '\n\t\tnew Shape({' +
						((path.id)? 'name: "' + path.name + '", ' : '' ) +
						((path.fill)? 'color: "' + path.fill + '", ' : '' ) +
						((path.d)? 'path: "' + path.d + '"': '') + '})';
				}
				
				shapeData += '\n\t]';
			}
			else shapeData += 'path: "' + paths[0].d + '"';
			resourceData += "\t\"" + fileName + '": ' + shapeData + "})";

			break;
	}
	
}
resourceData += '\n}';
fs.appendFileSync(modulesFolderPath + mainFileName + '.js', resourceData, 'utf8');
combinedLines.push(resourceData);

// Recombine the data and save the files as a module
let combinedData = combinedLines.join("\n");
fs.writeFileSync(outputFilePath+'.module.js', combinedData, 'utf8');

// Remove export declarations for simple ES6 file
for (lineIndex = 0; lineIndex < lineCount; lineIndex++) {
	let line = combinedLines[lineIndex], l = line.trim();
	if (l.startsWith('export ')) 
		combinedLines[lineIndex] = line.replace("export ","");
	if (l.startsWith('export default')) combinedLines[lineIndex] = "";
}



// Recombine the data and save the files as a simple ES6 file
combinedData = combinedLines.join("\n");
fs.writeFileSync(outputFilePath + '.js', combinedData, 'utf8');

// Embed the javascript code into a basic HTML file
let htmlCodeStart ="<!DOCTYPE html>\n<html>\n\t<head>\n" +
	"\t\t<meta charset=\"utf-8\">\n" +
	"\t\t<title>" + projectName + " SHISHO Template</title>\n" +
	"\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
	"\t\t<style> html, body { width:100%; height:100%; margin:0; } </style>\n" +
	"\t\t<script>\n";
let htmlCodeEnd = "\n\t\t</script>\n\t</head>\n\t<body>" +
	"\n\t\t<script>SHISHO.init();</script>\n\t</body>\n</html>\n";
let htmlCode = htmlCodeStart + combinedData + htmlCodeEnd
fs.writeFileSync(outputFilePath + '.html', htmlCode, 'utf8');


// Minify the code with Terser (CLI to avoid forcing to install it locally)
// https://github.com/terser/terser
console.log('Minifying javascript file...');
command = 'terser -m -o ' + outputFileName + '.min.js ' + outputFileName +'.js';
// console.log(command);
try { exec.execSync(command, { cwd: outputFolderPath, stdio: 'inherit'}); }
catch (e) { console.error("Unable to Minify!!"); throw (e); }

// Read the resulting minified file, add a preamble and create another HTML file
let minifiedData = fs.readFileSync(outputFilePath + '.min.js', 'utf8');
minifiedData = "// " + projectName + "\n\n" + minifiedData
fs.writeFileSync(outputFilePath + '.min.js', minifiedData, 'utf8');
htmlCode = htmlCodeStart + minifiedData + htmlCodeEnd
fs.writeFileSync(outputFilePath + '.min.html', htmlCode, 'utf8');

// Show a final message on console
console.log("ALL DONE")
