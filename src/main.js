//Lib
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import io from 'socket.io/node_modules/socket.io-client/lib/';
import utils from './lib/utils';

//Stores
import BillStore from './store/BillStore';

//Components
import App from './components/App';

//Mock or prod data switch (if ?mock in url)
utils.paths.url = window.location.href;

let socket = io('http://localhost:' + utils.paths.routes.socket);
socket.on('news', (data) => {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});