var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var count = 0;

app.use(express.static(__dirname));

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('move', function(msg){
  	console.log('move: ' + msg); //node.js에 move:up message보내기
  	io.emit('move', msg); //node.js move:up message io전체 서버?에 보내기??
  
  }); 

});



http.listen(3000, function(){
	console.log('listening on *:3000');
});