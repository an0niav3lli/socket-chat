var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

/*
BEGIN SERVER START
PORT MANUALLY SELECTED AFTER
.LISTEN
*/
http.listen(3000, function() {
  console.log('listening on *:3000');
});
/* END SERVER START */

/* BEGIN USER connection
TIGGER ON SOCKET OPEN
LOG IN CONSOLE
TRIGGER ON LEAVE
LOG IN CONSOLE
*/
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });
});
/* END USER connection */

/* BEGIN USER MESSAGING
SOCKET / CHAT / CONSOLE LOG */
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
/* END USER MESSAGING */

/* BEGIN MESSAGE LOG FOR BROADCAST
USING IO.emit */
io.emit('some event', { for: 'everyone'});
/* note - use broadcast flag to exclude sockets */
/* END MESSAGE LOG BROADCAST */

/* BEGIN SERVER MESSAGE BROADCAST TO EVERYONE */
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
/* END SERVER MESSAGE BROADCAST */
