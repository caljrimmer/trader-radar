//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

//Actions
import AppActions from '../../actions/AppActions';

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        const portfolio = this.props.collection;
        const stocks = this.props.stocks;

        let PortfolioRows = portfolio.map((row) => {
            if(!stocks.length) return;
            let stock = stocks.get({id:row.stockid});
            return (
                <tr>
                    <td>{stock.get('name')}<br/><span>({stock.get('symbol')})</span></td>
                    <td>{stock.get('delta')}</td>
                    <td>{stock.get('price')}</td>
                    <td>{row.qty}</td>
                    <td><a className="button sell" onClick={eventSell}>SELL</a></td>
                </tr>
            )
        });

        return (
            <div className="box">
                <table className="portfolio">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Delta</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>&nbsp;</th>
                        </tr>
                        {PortfolioRows}
                    </tbody>
                </table>
            </div>
        );
    }

};

export default Portfolio;