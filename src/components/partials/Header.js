//Lib
import React from 'react';

//Mixin
import mixins from 'es6-mixins';
import BackboneMixin from '../../mixin/BackboneMixin';

class Header extends React.Component {

    constructor (props) {
        super(props);
        mixins(BackboneMixin,this);
    }

    render () {

        var statement = this.props.model.get('statement');

        return (
            <div className="header">
                <h2 className="logo">Sky</h2>
                <p><em>This statement is for the period of {statement.period.from} to {statement.period.to}.</em></p>
            </div>
        );
    }

};

export default Header;