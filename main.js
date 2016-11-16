const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const {dialog} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // Send info
  mainWindow.webContents.on('did-finish-load', function()  {
    // mainWindow.webContents.send('ping', app.getPath('desktop'))
    // mainWindow.webContents.send('content', app.getPath('desktop'))
    checkContent()
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

}

function checkContent(){
  const fs = require('fs')
  const errors = []
  const contentPaths = new Map()

	const contentDir = app.getPath('desktop') + '/content/'

  /*
   * Check for video & thumb in each directory.
   */
  // Read content dir.
	fs.readdir(contentDir, (err, dirs) => {

    // Error if missing.
    if(err){
      messageQuit("Missing directory:" + err.path)
      return
    }

    // Exclude any directory that isn't a numeric string
    dirs = dirs.filter(dir => {
      return isNaN(dir) == false
    })

    // Check each dir for necessary files. 
		dirs.forEach(index => {
      const d = contentDir+index

      // Read content files within indexed dir.
      let files = fs.readdirSync(d);
        
      files = files.filter(file => {
        return [
         'video.mov', 
         'video.mp4', 
         'image.jpg', 
         'thumb.jpeg', 
         'thumb.png', 
         'thumb.gif'].includes(file)
      })

      files = files.map(function(path){
        return d+'/'+path;
      });

      // if text file exists.
      try {
        fs.accessSync(d+'/title.txt', fs.F_OK);
        var text = fs.readFileSync(d+'/title.txt').toString().split("\n");
        files.push(text);
      } catch(e) {
        files.push([]);
      }

      if(files.length < 2){
        errors.push(d)
      } else {
        contentPaths.set(`${index}`, files)
      }

		})

    // Show errors with content.
    if(errors.length > 0){
      dialog.showMessageBox({ 
        type: "error",
        message: "There was a problem with the content in the following directories: \n\n"+ errors.join('\n') + '\n\nPlease ensure there is a thumb.[jpg,jpeg,png] and a video.[mp4,mov] in each directory', 
        buttons: ["OK"] 
      })
    }

    mainWindow.webContents.send('content', [...contentPaths])

	})

}

function fileExists(file){
	try {
		fs.accessSync(file, fs.F_OK);
    return true
	} catch (e) {
    return false
	}
}

function messageQuit(msg){
  dialog.showMessageBox({ 
    type: "error",
    message: msg, 
    buttons: ["OK"]
  }, function(ind){
    if(ind == 0){
      app.quit()
    }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

