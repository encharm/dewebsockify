# dewebsockify

Turn websockify websocket endpoint back into a TCP socket

### Why?
* Access [novnc](http://kanaka.github.io/noVNC/) instances through ordinary VNC client
* Access SSH servers or other TCP services that were websockified and proxied through an ordinary HTTP/HTTPS server. This is possible with [http-master](https://github.com/CodeCharmLtd/http-master/tree/feature/dependency-injection).

### How to install?

Install Node.JS and do `npm install -g dewebsockify` (it may require root/sudo)

### How to use?

```
dewebsockify ws://server/path/to/novnc 5900
# and now connect with VNC client to localhost
```

####
```
dewebsockify wss://myserver.net/services/ssh 2222
ssh localhost -p 2222
```

## License
Copyright (c) 2014 [Code Charm Ltd](http://codecharm.co.uk)

Licensed under the MIT license, see `LICENSE` for details.
