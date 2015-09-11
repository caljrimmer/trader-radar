import Backbone from 'backbone';
import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * I prefer to use Backbone Models for stores because:
 *  + I get the Event Emitter for free.
 *  + Also in more complicated apps I can use the Router
 */

class Bill extends Backbone.Model {

    constructor () {
        super();
        this.dispatchToken = AppDispatcher.register(this.dispatchCallback.bind(this));
    }

    defaults() {
        return {
            loading: true,
            statement: {
                generated: "",
                due: "",
                period: {
                    from: "",
                    to: ""
                }
            },
            total: 0.00,
            package: {
                subscriptions: [],
                total: 0.00
            },
            callCharges: {
                calls: [],
                total: 0.00
            },
            skyStore: {
                rentals: [],
                buyAndKeep: [],
                total: 0.0
            }
        }
    }

    sync (method, model, options) {

        /**
         * We could do the API request here
         * but I have moved requests to the Actions
         */

        return;
    }

    dispatchCallback (payload) {
        switch (payload.actionType) {
            case 'get-bill':
                payload.value.loading = false;
                this.set(payload.value);
                break;
        }
    }

};

export default Bill;