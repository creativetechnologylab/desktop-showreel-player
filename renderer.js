// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// const fs = require('fs')
// console.log(fs)
const path = require('path')

const {ipcRenderer} = require('electron')
ipcRenderer.on('content', function(event, data){
  console.log(event, data)
})

const {dialog} = require('electron').remote
