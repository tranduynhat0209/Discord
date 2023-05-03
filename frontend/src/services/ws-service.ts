import { WS } from "../types"
import io from 'socket.io-client';

const ws = (io as any).connect(process.env.REACT_APP_ROOT_API_URL, {
  secure: true,
  path: `/ws`,
  transports: ['websocket', 'polling', 'flashsocket'],
});

ws.io.on('open', () => console.log('Connected to WS Server'));

export default ws as WSClient;

interface WSClient {
  emit: <K extends keyof WS.EmitParams>(event: K, args: WS.EmitParams[K]) => any;
  on: <K extends keyof WS.ListenParams>(event: K | 'error' | 'disconnect', callback: (args: WS.ListenParams[K]) => any) => any;
  off: (event: string, callback?: any) => any;
  disconnect: () => any;
}