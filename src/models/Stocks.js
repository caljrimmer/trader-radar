import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'underscore';

export class Stock extends Backbone.Model {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
    }

    default() {
        return {
            id : '',
            name : '',
            symbol : '',
            desc : '',
            data : [],
            price : 0.00,
            delta : 0.00
        }
    }

    sync (method, model, options) {
        return;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-stocks':
                this.set(payload.value);
                break;
        }
    }

};

export class Stocks extends Backbone.Collection {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
    }

    model () {
        return Stock;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-stocks':
                _.each(payload.value,(model) => {
                    this.add(new Backbone.Model(model));
                })
                break;
            case 'update-price':
                this.findWhere({id:payload.value.id}).set(payload.value);
                break;
        }
    }

};
