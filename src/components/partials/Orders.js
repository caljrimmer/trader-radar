//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class Orders extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        const orders = this.props.collection.toJSON();
        const stocks = this.props.stocks;

        let OrderRows = orders.map((row) => {
            let date, time = new Date(row.date).toLocaleString('en-UK').split(',');
            let stock = stocks.get({id:row.stockid});
            let amount = Math.ceil(row.qty * stock.get('price'));
            return (
                <li className={row.type === 'buy' ? 'buy' : 'sell'}>
                    <div className="title">
                        <h3>{stock.get('name')}</h3>
                        <h4>{stock.get('symbol')}</h4>
                    </div>
                    <div className="details">
                        <h3>{amount}</h3>
                        <h4>{row.qty} @ {stock.get('price')}</h4>
                    </div>
                    <td className="date">
                        <p>Trade on {date} @ {time} </p>
                    </td>
                </li>
            )
        });

        return (
            <div className="box">
                <ul className="orders">
                    {OrderRows}
                </ul>
            </div>
        );

    }

};

export default Orders;