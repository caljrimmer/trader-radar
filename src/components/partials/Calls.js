//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class Calls extends React.Component {

    constructor(props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        var total = this.props.model.get('callCharges').total;
        var calls = this.props.model.get('callCharges').calls;

        var CallRows = calls.map((call) => {
            return (
                <tr>
                    <td>{call.called}</td>
                    <td>{call.duration}</td>
                    <td>{call.cost}</td>
                </tr>
            )
        });

        return (
            <div className="box">
                <h2>Calls</h2>
                <table id="calls">
                    <tbody>
                        <tr>
                            <th>Number</th>
                            <th>Duration</th>
                            <th>Cost</th>
                        </tr>
                        {CallRows}
                        <tr>
                            <td colSpan="2"></td>
                            <td className="total">{total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

};

export default Calls;