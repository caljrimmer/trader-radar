import AppDispatcher from '../dispatcher/AppDispatcher';
import $ from 'jquery';

const actions = {

    getBill (url){
        $.ajax({
            url: url,
            success: (data) => {
                AppDispatcher.dispatch({
                    actionType: 'get-bill',
                    value: data
                });
            }
        });
    }

};

export default actions
