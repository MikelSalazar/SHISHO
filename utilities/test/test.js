// ----------------------------------------------------------------------------
// SHISHO - Test system (Electron script)
// ----------------------------------------------------------------------------

// Load the electron package and disable the security warnings
const { app, BrowserWindow } = require('electron');
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


// Check if electron uis installed
if (!app) throw error ("Electron not available");
else console.log("Loading Electron...");


/** Creates the Electron window. */
function createWindow () {
	
	// Create the window
	const win = new BrowserWindow({ width: 800, height: 600,
		show: false, 				// Start hidden
		fullScreen: true, 			// Show it in full screen
		darkTheme: true,			// Use a dark theme
		autoHideMenuBar: true,		// Hiode the menu bar
		webPreferences: {
			devTools:true,			// Activate the dev tools
			nodeIntegration: false	// Integrate with Node.JS
		}
	});

	// Load the file
	win.loadFile('../../tests/index.html');

	// Make sure to open the dev tools
	win.webContents.openDevTools();

	// Show and maximize the window whenever the window is ready
	win.once('ready-to-show', () => { win.maximize();win.show(); });
}


// Create the window when the Electron app is ready
app.whenReady().then(createWindow);


// Close the app when the window is closed
app.on('window-all-closed', () => { app.quit() });

