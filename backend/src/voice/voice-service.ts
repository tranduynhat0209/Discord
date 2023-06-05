import { ChannelTypes } from "../types";

export class VoiceService {
  private connections = new Map<string, ChannelTypes.VoiceConnection[]>();

  private getOrCreate(channelId: string) {
    return (
      this.connections.get(channelId) ??
      this.connections.set(channelId, []).get(channelId)!
    );
  }

  public get(channelId: string) {
    return this.getOrCreate(channelId);
  }

  public getForUser(channelId: string, userId: string) {
    // check if user is already connected
    const cons = this.getOrCreate(channelId);
    const isConnected = cons.some((u) => u.userId === userId);
    if (!isConnected)
      throw new TypeError("You are not connected to the voice service");

    return cons.filter((c) => c.userId !== userId);
  }

  public add(channelId: string, data: ChannelTypes.VoiceConnection) {
    const cons = this.getOrCreate(channelId);
    cons.push(data);
    this.connections.set(channelId, cons);
  }

  public remove(channelId: string, userId: string) {
    const cons = this.getOrCreate(channelId);
    const index = cons.findIndex((c) => c.userId === userId);

    cons.splice(index, 1);
    this.connections.set(channelId, cons);
  }

  public setForUser(channelId: string, data: ChannelTypes.VoiceConnection) {
    const cons = this.getOrCreate(channelId);
    const index = cons.findIndex(c => c.userId === data.userId);

    cons[index] = data;
    this.connections.set(channelId, cons);

    return this.getForUser(channelId, data.userId);
  }

}
