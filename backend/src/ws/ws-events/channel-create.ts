import { Socket } from "socket.io";
import { WSEvent } from ".";
import { WS } from "../../types";
import { WebSocket } from "../websocket";


export default class implements WSEvent<'CHANNEL_CREATE'>{
    public on = "CHANNEL_CREATE" as const;
    public async invoke(ws: WebSocket, client: Socket, {name, guildId, type}: WS.Params.ChannelCreate) {
        if(!name || !guildId || !type){
            throw new TypeError('missing parameters');
        }
        await deps.wsGuard.validateCan(client, guildId, 'MANAGE_CHANNELS');
        const channel = await deps.channels.create({ name, guildId, type });
        return [{
            emit: this.on,
            to: [guildId],
            send: {
                channel,
                creatorId: ws.sessions.get(client.id),
                guildId
            } as WS.Args.ChannelCreate
        }]
    };
    
}