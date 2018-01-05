var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({port: 8080});

console.log('Server started on 8080');

var
  rabbit = {x:0, y:0};

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log(message);
        var incommingMsg = JSON.parse(message);
        rabbit.x = incommingMsg.x;
        rabbit.y = incommingMsg.y;
        console.log(wss.clients.size);
        for(let item of wss.clients) {
            item.send(JSON.stringify(rabbit));
        }

    });
    ws.send(JSON.stringify(rabbit));
});
