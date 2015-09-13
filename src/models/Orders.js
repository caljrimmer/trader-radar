import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'underscore';

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
                _.each(payload.value,(model) => {
                    this.add(new Backbone.Model(model));
                })
                break;
        }
    }

};

export default Orders;