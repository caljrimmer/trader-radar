class Paths {

    get url () {
        return this._url;
    }

    set url (url) {
        this._url = url;
        this.routes = url;
    }

    get routes () {
        return this._routes;
    }

    set routes (url) {
        if(url.indexOf('?mock') !== -1) {
            //Mock Routes
            this._routes = {
                rest : 25000,
                socket : 25001
            }
        }else{
            //Prod Routes
            this._routes = {
                rest : 25000,
                socket : 25001
            }
        }
    }

}


var utils = {
    paths : new Paths
};

export default utils;