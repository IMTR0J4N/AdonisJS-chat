import ChatController from "App/Controllers/Http/ChatController";
import Ws from "App/Services/Ws";

Ws.boot();

Ws.io.on('client:send-message', (data: { author: string, msg: string }) => {
        new ChatController().createMessage(data);
})