import ChatController from 'App/Controllers/Http/ChatController'
import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('client:send-message', (data: Array<{ author: string, msg: string }>) => {
    
    new ChatController().createMessage(data)

    Ws.io.emit('server:send-message', data)
  })
})