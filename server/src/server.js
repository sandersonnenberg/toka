import express from "express";
import router from "./router.js";
import expressWs from "express-ws";

class Server {
  constructor() {
    const app = express();
    const wss = expressWs(app).getWss();
    app.use(express.json());
    app.use(router);
    app.ws("/ws", (ws) => {
      console.log("ws client connected");
      ws.onclose = () => console.log("ws client disconnected");
    });

    this.app = app;
    this.wss = wss;
  }
  broadcast(msg) {
    console.log("[WebSocket] Broadcasting:", msg);
    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(msg));
      }
    });
  }
  start() {
    return new Promise((resolve) => {
      this.server = this.app.listen(3000, () => {
        resolve(this.server);
        console.log("server started", `http://localhost:3000`);
      });
    });
  }
}

export const server = new Server();
