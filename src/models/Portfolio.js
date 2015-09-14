import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';
import _ from 'lodash';
import StocksStore from '../store/StocksStore';

class Trade extends Backbone.Model {

    constructor () {
        super();
    }

    default() {
        return {
            id : '',
            stockid : '',
            qty : 0
        }
    }

    sync (method, model, options) {
        return;
    }

};

class Portfolio extends Backbone.Collection {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
    }

    model () {
        return Trade;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-portfolio':
                let modelArray = [];
                _.each(payload.value,(model) => {
                    modelArray.push(new Backbone.Model(model));
                });
                this.add(modelArray,{silent:true});
                this.trigger('add');
                break;
            case 'delete-trade':
                this.findWhere({id:payload.value.id}).remove();
                break;
        }
    }

};

export default Portfolio;