//Lib
import React from 'react';
import chart from '../../lib/chart';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class StockDetail extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        let model = this.props.model;

        /*
        let el = ReactDOM.findDOMNode(this);
        chart.bar(model.data.toJSON(),el);
        */

        return (
            <div className="box">
                <div className="stock-details">
                    <div class="info">
                        <h2>{model.name} ({model.symbol})</h2>
                        <p>{model.desc}</p>
                    </div>
                    <div class="chart">
                    </div>
                </div>
            </div>
        );
    }

};

export default StockDetail;