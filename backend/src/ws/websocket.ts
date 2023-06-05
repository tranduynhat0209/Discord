import { WS } from "../types";
import { Server } from "http";
import { Server as SocketServer } from "socket.io";
import { WSAction, WSEvent } from "./ws-events";
import { SessionManager } from "./modules/session-manager";
import { resolve } from "path";
import { readdirSync } from "fs";

export class WebSocket {
  public events = new Map<
    keyof WS.ListenParams,
    WSEvent<keyof WS.ListenParams>
  >();
  public io: SocketServer;
  public sessions = new SessionManager();

  public get connectedUserIds() {
    return Array.from(this.sessions.values());
  }

  public async init(server: Server) {
    this.io = new SocketServer(server, {
      cors: {
        origin: process.env.WEBSITE_URL,
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization"],
        credentials: true,
      },
      path: "/ws",
      serveClient: false,
    });

    const dir = resolve(`${__dirname}/ws-events`);
    const files = readdirSync(dir);

    for (const file of files) {
      const Event = require(`./ws-events/${file}`).default;
      try {
        const event = new Event();
        this.events.set(event.on, event);
      } catch {}
    }

    log.verbose(`Loaded ${this.events.size} handlers`, "ws");

    this.io.on("connection", (client) => {
      for (const event of this.events.values())
        client.on(event.on, async (data: any) => {
          try {
            const actions = await event.invoke.call(event, this, client, data);
            for (const action of actions) if (action) this.handle(action);
          } catch (error: any) {
            client.emit("error", { message: error.message });
          } finally {
            try {
              const userId = this.sessions.userId(client);
              deps.wsCooldowns.handle(userId, event.on);
            } catch {}
          }
        });
    });

    log.info("Started WebSocket", "ws");
  }

  public handle(action: WSAction<keyof WS.EmitParams>) {
    this.io.to(action.to).emit(action.emit, action.send);
  }

  public to(...rooms: string[]) {
    return this.io.to(rooms) as {
      emit: <K extends keyof WS.EmitParams>(name: K, args: WS.EmitParams[K]) => any;
    };
  }
}
