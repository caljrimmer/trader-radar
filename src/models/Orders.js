import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'lodash';
import StocksStore from '../store/StocksStore';

class Order extends Backbone.Model {

    constructor () {
        super();
    }

    default() {
        return {
            id : '',
            stockid : '',
            qty : 0,
            type : '',
            date : ''
        }
    }

    sync (method, model, options) {
        return;
    }

};

class Orders extends Backbone.Collection {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
    }

    model () {
        return Order;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-orders':
                let modelArray = [];
                _.each(payload.value,(model) => {
                    modelArray.push(new Backbone.Model(model));
                });
                this.add(modelArray,{silent:true});
                this.trigger('add');
                break;
        }
    }

};

export default Orders;