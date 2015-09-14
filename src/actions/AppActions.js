import AppDispatcher from '../dispatcher/AppDispatcher';
import 'whatwg-fetch';
import utils from '../lib/utils';
import io from 'socket.io/node_modules/socket.io-client/lib/';

//Mock or prod data switch (if ?mock in url)
utils.paths.url = window.location.href;

const restPath = 'http://localhost:' + utils.paths.routes.rest;
const socketPath = 'http://localhost:' + utils.paths.routes.socket;
const socket = io(socketPath);

socket.on('stocks', (data) => {
    actions.getStocks(data);
    actions.getOrders();
    actions.getPortfolio();
});

socket.on('price', (data) => {
    actions.updatePrice(data);
});

const actions = {

    getStocks (data){
        AppDispatcher.dispatch({
            actionType: 'get-stocks',
            value: data
        });
    },

    updatePrice (data){
        AppDispatcher.dispatch({
            actionType: 'update-price',
            value: data
        });
    },

    getOrders (){

        fetch(restPath + '/orders')
            .then(utils.status)
            .then(utils.json)
            .then(function(json) {
                console.log('request succeeded with json response', json);
                AppDispatcher.dispatch({
                    actionType: 'get-orders',
                    value: json
                });
            })

    },

    getPortfolio (){

        fetch(restPath + '/portfolio')
            .then(utils.status)
            .then(utils.json)
            .then(function(json) {
                console.log('request succeeded with json response', json);
                AppDispatcher.dispatch({
                    actionType: 'get-portfolio',
                    value: json
                });
            })

    }

};

export default actions
