//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class Order extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        let rentals = [];

        var OrderRows = rentals.map((row) => {
            return (
                <li className={row.type === 'buy' ? 'buy' : 'sell'}>
                    <div className="title">
                        <h3>{row.name}</h3>
                        <h4>{row.symbol}</h4>
                    </div>
                    <div className="details">
                        <h3>{row.amount}</h3>
                        <h4>{row.quantity} @ {row.price}</h4>
                    </div>
                    <td className="date">
                        <p>Trade on {row.date} @ {row.time} </p>
                    </td>
                </tr>
            )
        });

        return (
            <ul className="orders">
            </ul>
        );
    }

};

export default Order;