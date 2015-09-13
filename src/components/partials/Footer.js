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

        return (
            <div className="footer">
                <p><span>by Callum Rimmer</span> <a href="https://github.com/caljrimmer/trader-radar">Get source code on GitHub</a></p>
            </div>
        );
    }

};

export default Footer;