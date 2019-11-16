let express = require('express')
let app = express();
let api = require('./api.js');

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
	
	socket.on('new-message', (message) => {
		console.log(message);
		io.emit('new-message', message);
	});
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use('/uploads/*', express.static(__dirname + '/uploads/*'));
app.use('/',api)
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});