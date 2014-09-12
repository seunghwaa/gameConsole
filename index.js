var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


/*var count = 0;

app.use(express.static(__dirname));

io.on('connection', function(socket){
	userid = userid + 1;

	console.log('a user connected. userid: ' + userid);
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('move', function(msg){
  	console.log('move: ' + msg); //node.js에 move:up message보내기
  	io.emit('move', msg); //node.js move:up message io전체 서버?에 보내기??
  
  }); 

});*/


var userid = 0;

app.use(express.static(__dirname)); //(localhost:3000/controller.html)html 주소를 보이게 함



io.on('connection', function(socket){
   
	socket.on('identify', function(msg){
		if (msg === 'viewer')
		{

			console.log('a viewer connected.');

			this.on('disconnect', function(){
				console.log('viewer disconnected.');
				
			});

		}
		else if (msg === 'controller') 
		{
			userid = userid + 1;
			console.log('a controller connected. userid:' + userid);
			
			this.userid = userid;

			io.emit('addmm', this.userid);

			this.on('disconnect', function(){
				io.emit('destroymm', this.userid);
				console.log('controller disconnected. userid:' + this.userid);
				
			});

			this.on('move', function(msg){
    			console.log('move: ' + msg.direction + ', userid: ' + this.userid); //socket이나 msg 뒤에 오는 '.'은 일을 시킬때?
    			msg.userid = this.userid;
    			io.emit('move', msg);
    		});
		}
	});
    

  
   

    

    	//var sendMsg = {};

    	//sendMsg.userid = this.userid;
    	//sendMsg.direction = msg;

    	//io.emit('move', sendMsg);
	


});  //user id만들기_ 여러창 컨트롤켜면 이용자 숫자 나옴.


http.listen(3000, function(){
	console.log('listening on *:3000');
});