//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../mixin/BackboneMixin';

//Actions
import AppActions from '../actions/AppActions';

//Stores
import OrdersStore from '../store/OrdersStore';
import PortfolioStore from '../store/PortfolioStore';
import StocksStore from '../store/StocksStore';
import StockStore from '../store/StockStore';

//Partials
import StockDetail from './partials/StockDetail';
import Orders from './partials/Orders';
import Portfolio from './partials/Portfolio';
import Header from './partials/Header';
import Footer from './partials/Footer';

AppActions.getPortfolio();
AppActions.getOrders();

class App extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {
        return (
            <div>
                <Header />
                <StockDetail model={StockStore} />
                <Orders stocks={StocksStore} collection={OrdersStore} />
                <Portfolio stocks={StocksStore} collection={PortfolioStore} />
                <Footer />
            </div>
        )
    }

};

export default App;