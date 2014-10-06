#!/usr/bin/env node
var net = require('net');
var WebSocket = require('ws');

var net = require('net');

if(process.argv.length < 4) {
	console.log("Usage: dewebsockify ws://someserver/path <port>");
  process.exit(1);
}
var port = process.argv[3];

var server = net.createServer(function(socket) {
  var ws = new WebSocket(process.argv[2], {
    rejectUnauthorized: false
  });

  socket.on('error', function(err) {
    ws.close();
    socket.close();
  });

  ws.on('error', function(err) {
    console.log("Connection from", socket.address().address ,"to end-point...", err.toString());
    socket.end();
  });

  ws.on('open', function() {
    socket.address = socket.address().address;
    console.log("Connection from", socket.address ,"accepted");
    socket.on('data', function(data) {
      ws.send(data);
    });
  });

  ws.on('message', function(data, flags) {
    socket.write(data);
  });

  socket.on('end', function() {
    console.log("Connection from", socket.address ,"ended");
    ws.close();
  });

  ws.on('close', function() {
    console.log("Web socket server has closed connection, closing socket to", socket.address);
    socket.end();
  });

}).listen(port);
