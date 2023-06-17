import { WS } from "../types";
import io from "socket.io-client";

const ws = io(process.env.REACT_APP_ROOT_API_URL, {
  transports: ["websocket"],
  path: '/ws'
})
ws.connect();
ws.on("connect", () => {
  console.log(ws.connected); // true
});


ws.io.on("open", () => console.log("WS is opened"));


export default ws as WSClient;

interface WSClient {
  emit: <K extends keyof WS.ListenParams>(
    event: K,
    args: WS.ListenParams[K]
  ) => any;
  on: <K extends keyof WS.EmitParams>(
    event: K | "error" | "disconnect",
    callback: (args: WS.EmitParams[K]) => any
  ) => any;
  off: (event: string, callback?: any) => any;
  disconnect: () => any;
}
