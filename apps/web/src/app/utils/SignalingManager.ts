import { Ticker } from "./types";

export const BASE_URL = "wss://ws.backpack.exchange/"
// export const BASE_URL = "ws://localhost:3001"

export class SignalingManager {
    private ws: WebSocket;
    private static instance: SignalingManager;
    private bufferedMessages: any[] = [];
    private callbacks: any = {};
    private id: number;
    private initialized: boolean = false;

    private constructor() {
        this.ws = new WebSocket(BASE_URL);
        this.bufferedMessages = [];
        this.id = 1;
        this.init();
    }

    public static getInstance() {
        if (!this.instance)  {
            this.instance = new SignalingManager();
        }
        return this.instance;
    }

    init() {
        this.ws.onopen = () => {
            this.initialized = true;
            this.bufferedMessages.forEach(message => {
                this.ws.send(JSON.stringify(message));
            });
            this.bufferedMessages = [];
        }

        this.ws.onmessage = (event) => {            
            let message=JSON.parse(event.data);
            if (message && message.data) {
                const type = message.data.e;
                if (this.callbacks[type]) {
                    this.callbacks[type].forEach(({ callback }: any) => {
                        if (type === "ticker") {
                            const newTicker: Partial<Ticker> = {
                                lastPrice: message.data.c,
                                high: message.data.h,
                                low: message.data.l,
                                volume: message.data.v,
                                quoteVolume: message.data.V,
                                symbol: message.data.s,
                            }
                            callback(newTicker);
                       }
                       if (type === "depth") {
                            const updatedBids = message.data.b;
                            const updatedAsks = message.data.a;
                            callback({ bids: updatedBids, asks: updatedAsks });
                        }
                    });
                }
            } else {
                console.error('Message data is undefined or invalid:', message);
            }
        }

        this.ws.onerror = (event) => {
            console.error('WebSocket error:', event);
        }

        this.ws.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        }
    }

    sendMessage(message: any) {
        const messageToSend = {
            ...message,
            id: this.id++
        }
        if (!this.initialized) {
            this.bufferedMessages.push(messageToSend);
            return;
        }
        this.ws.send(JSON.stringify(messageToSend));
    }

    async registerCallback(type: string, callback: any, id: string) {
        this.callbacks[type] = this.callbacks[type] || [];
        this.callbacks[type].push({ callback, id });
    }

    async deRegisterCallback(type: string, id: string) {
        if (this.callbacks[type]) {
            const index = this.callbacks[type].findIndex((callback: { id: string; }) => callback.id === id);
            if (index !== -1) {
                this.callbacks[type].splice(index, 1);
            }
        }
    }
}
