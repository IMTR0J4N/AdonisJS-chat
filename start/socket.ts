import MessagesController from 'App/Controllers/Http/MessagesController'
import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('message', (data: { author: string; msg: string }) => {
    new MessagesController().create(data)
  })
})
