//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class Footer extends React.Component {

    constructor (props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        var statement = this.props.model.get('statement');
        var total = this.props.model.get('total');

        return (
            <div className="footer">

                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2"></td>
                            <td className="priceBox">
                                <div>
                                    <h3 className="total">{total}</h3>
                                    <p className="tagline">Due by {statement.due}</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

};

export default Footer;