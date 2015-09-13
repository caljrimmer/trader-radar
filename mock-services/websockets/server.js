var app = require('http').createServer();
var io = require('socket.io')(app);
var low = require('lowdb');
var faker = require('faker');

var dbpath = './mock-services/restful/db.json';
var db = low(dbpath);

app.listen(process.argv[2]);

io.on('connection', function (socket) {

    socket.emit('stocks', db('stocks').cloneDeep());

    setInterval(function(){
        var id = db('stocks').sample(1)[0].id;
        socket.emit('price',
             db('stocks')
                .chain()
                .find({id:id})
                .assign({
                    price : Math.random() * 100,
                    delta : faker.random.boolean() ? Math.random() : -Math.random()
                })
                .value()
        );
    },1000);

    socket.on('disconnect', function () {
        socket.emit('disconnected');
    });

});

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});