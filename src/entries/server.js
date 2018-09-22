import WebSocket from 'ws';

let countdown = 0;

const wss = new WebSocket.Server({ port: 8000 });

setInterval(() => {
    if (countdown > 0) {
        countdown -= 1;
    }

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(countdown));
        }
    });
}, 1000);

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        countdown = Number(JSON.parse(message)) * 60;
    });
});

wss.on('error', console.error);
