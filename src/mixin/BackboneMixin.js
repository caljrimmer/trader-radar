var BackboneMixin = {

    componentDidMount () {

        if (this.props.model) {
            this.props.model.on('change', () => {
                this.forceUpdate();
            });
        }

        if (this.props.collection) {
            this.props.collection.on('add remove reset sort', () => {
                this.forceUpdate();
            });
        }

    },

    componentWillUnMount () {

        if(this.props.model){
            this.props.model.off(null, null, this);
        }

        if(this.props.collection){
            this.props.collection.off(null, null, this);
        }

    }
}

export default BackboneMixin;