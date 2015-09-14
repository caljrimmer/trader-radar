var faker = require('faker');
var low = require('lowdb');
var fs = require('fs');

var dbpath = './mock-services/restful/db.json';

fs.exists(dbpath, function(exists) {
    if (exists) {
        fs.unlinkSync(dbpath);
    }
});

var db = low(dbpath);
var limits = {
    chart : 20,
    stocks : 100,
    orders : 10,
    portfolio : 10
};

function chartData() {
    var z=0;
    var chartArray = [];
    var day = 86400 * 1000;
    var start = (new Date().getTime()) - day;
    for ( var z=z ; z < limits.chart ; z++ ) {
        chartArray.push([start + (z * day),Math.random() * 100])
    }
    return chartArray;
}

var i=0;
for (var i=i ; i < limits.stocks ; i++ ) {
    var fn = faker.name.lastName();
    var ln = faker.name.jobTitle();
    var name = fn + ' ' + ln;
    var symbol = (fn.substr(0,2) + ln.substr(0,2)).toUpperCase();
    var delta  = faker.random.boolean() ? Math.random() : -Math.random();
    db('stocks').push({
        id : faker.random.uuid(),
        name : name,
        symbol : symbol,
        desc : faker.lorem.paragraphs(),
        data : chartData(),
        price : Math.random() * 100,
        delta : delta
    });
}

var portfolioItems = db('stocks').sample(limits.portfolio);
portfolioItems.forEach(function(item){

    db('portfolio').push({
        id : faker.random.uuid(),
        stockid : item.id,
        qty : faker.random.number()
    });
});

var orderItems = db('stocks').sample(limits.orders);
orderItems.forEach(function(item){
    var type = faker.random.boolean() ? 'buy' : 'sell';
    db('orders').push({
        id : faker.random.uuid(),
        stockid : item.id,
        type : type,
        qty : faker.random.number(),
        date : faker.date.past()
    });
});

console.log('Added mock data to LowDB');



