import { io, Socket } from "socket.io-client";

export type listenerType = (args: any) => any;

class SocketAgent {
  private static instance: SocketAgent;
  private static socket: Socket | null = null;

  private constructor() {
    SocketAgent.socket = io("_URL_");

    this.subscribe("connect", () => {
      console.log("SocketAgent connected");
    });

    this.subscribe("disconnect", () => {
      console.log("SocketAgent disconnected");
    });
  }

  public static getInstance(): SocketAgent {
    if (!SocketAgent.instance) {
      SocketAgent.instance = new SocketAgent();
    }

    return SocketAgent.instance;
  }

  public send(event: string, data?: any) {
    SocketAgent.socket?.emit(event, data);
  }

  public subscribe(event: string, listener: listenerType) {
    SocketAgent.socket?.on(event, listener);
  }

  public unsubscribe(event: string) {
    SocketAgent.socket?.off(event);
  }

  public subscribeOnce(event: string, listener: listenerType) {
    SocketAgent.socket?.once(event, listener);
  }

  public getEventListeners(event: string) {
    return SocketAgent.socket?.listeners(event);
  }

  public disconnect() {
    SocketAgent.socket?.disconnect();
  }
}

export default SocketAgent;
