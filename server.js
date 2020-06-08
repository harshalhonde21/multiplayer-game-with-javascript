var express = require('express');
var path = require('path');
const serverless = require('serverless-http');
var app = express();

var server = app.listen(80);
app.use(express.static('public'));//folder name = public 
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log('new connection: ' + socket.id);
  socket.on('frame', getCoordinates);
  function getCoordinates(data){
    socket.broadcast.emit('frame', data);
  }

  socket.on('bullet', sendBullet);

  function sendBullet(i){
    socket.broadcast.emit('bullet', i);
  }

  socket.on('gameOver', (data)=> {
    socket.broadcast.emit('gameOver', data);
  })

  socket.on('chat', (data)=>{
    socket.broadcast.emit('chat', data);
  })
}

