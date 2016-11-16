import 'babel-polyfill'; // generators
import React from 'react';
import { render as renderReact } from 'react-dom';

import {default as electron, ipcRenderer} from 'electron';


let data = [];

ipcRenderer.on('content', function(event, d){
  data = d;
})

let App = require('./App').default;
const render = (Component) => {

  if(data.length == 0) {
    setTimeout(function(){
      render(Component);
    }, 500);

    return;
  }

  renderReact(<Component videos={data}/>, document.getElementById('root'));
};

if (module.hot) {
  module.hot.accept('./App', function() {
    let newApp = require('./App').default;
    render(newApp);
  });
}

render(App);
