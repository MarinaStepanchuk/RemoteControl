import { httpServer } from "./src/http_server";
import {createWebSocketStream, WebSocketServer} from 'ws'
import { launchUserInfoCommand } from "./handlers/infoCommands";
import { launchUserDrawCommand } from "./handlers/controlCommands";

const httpPort = process.env.HTTP_PORT || 8181;
const wssPort = process.env.WSS_PORT || 8080;

const wss = new WebSocketServer({ port: Number(wssPort) });

console.log(`Start static http server on the ${httpPort} port!`);
httpServer.listen(httpPort);

wss.on('connection', ws => {
  console.log(`Connection has been established on port ${httpPort}`);

  const wsStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  wsStream.on('data', async data => {
    const [command, width, height] = data.toString().split(' ');
    console.log(command);
    await launchUserInfoCommand(wsStream, data);

    await launchUserDrawCommand(command, width, height);

    console.log(`Command: ${data}`);
  })
})

wss.on('close', () => console.log('Websocket connection is closed'));
