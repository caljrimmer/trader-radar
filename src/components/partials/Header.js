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
        return (
            <div className="header">
                <h2 className="logo">Trader Radar</h2>
            </div>
        );
    }

};

export default Header;