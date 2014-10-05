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
  ws.on('open', function() {
    socket.on('data', function(data) {
      ws.send(data);
    });
  });
  ws.on('message', function(data, flags) {
    socket.write(data);
  });
  socket.on('end', function() {
    ws.close();
  });
  socket.on('error', function() {
    ws.close();
    socket.close();
  });

  ws.on('close', function() {
    socket.end();
  });

}).listen(port);

