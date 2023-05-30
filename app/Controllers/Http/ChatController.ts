import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatController {
  async createMessage(data: { author: string; msg: string }) {
    const message = new Message()

    await message
      .fill({
        author: data.author,
        message: data.msg,
      })
      .save()
    
    this.sendDataToClient('server:send-message', data)
    
    }
    
    async firstConnectionData() {
    const messagesDbRes = await Message.all()
    const messagesTable: Object[] = []
    
    for (const data of messagesDbRes) {
      messagesTable.push({ author: data.author, msg: data.message });
    }

      this.sendDataToClient('server:send-message', messagesTable);
  }
  
  async renderChat({ view }: HttpContextContract) {
    this.firstConnectionData()
    return view.render('chat')
  }
  
  async sendDataToClient(evt, data) {
      Ws.io.emit(evt, data)
  }
}
