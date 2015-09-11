//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';

//Partials
import StockDetail from './partials/StockDetail';
import Header from './partials/Header';
import Footer from './partials/Footer';

class App extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {
        var model = this.props.model;
        if(model.get('loading')){
            return (
                <div>
                    <h1 className="loading">...Loading</h1>
                </div>
            )
        }else{
            return (
                <div>
                    <Header model={model} />
                    <StockDetail model={model} />
                    <Footer model={model} />
                </div>
            )
        }
    }

};

export default App;