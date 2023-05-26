import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('message', (data: { author:String, msg:String}) => {
    socket.emit('incoming-message', { data })
  })
})
