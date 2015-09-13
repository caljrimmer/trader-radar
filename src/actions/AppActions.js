import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';
import utils from '../lib/utils';
import io from 'socket.io/node_modules/socket.io-client/lib/';

//Mock or prod data switch (if ?mock in url)
utils.paths.url = window.location.href;

const restPath = 'http://localhost:' + utils.paths.routes.rest;
const socketPath = 'http://localhost:' + utils.paths.routes.socket;
const socket = io(socketPath);

socket.on('stocks', (data) => {
    actions.getStocks(data);
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
        $.ajax({
            url: restPath + '/orders',
            method : 'GET',
            success: (data) => {
                AppDispatcher.dispatch({
                    actionType: 'get-orders',
                    value: data
                });
            }
        });
    },

    getPortfolio (){
        $.ajax({
            url: restPath + '/portfolio',
            method : 'GET',
            success: (data) => {
                AppDispatcher.dispatch({
                    actionType: 'get-portfolio',
                    value: data
                });
            }
        });
    }

};

export default actions
