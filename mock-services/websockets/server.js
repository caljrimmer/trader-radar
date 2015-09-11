var app = require('http').createServer();
var io = require('socket.io')(app);
app.listen(process.argv[2]);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

process.on('SIGTERM', function () {
    server.close(function () {
        process.exit(0);
    });
});