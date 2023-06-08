import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws'
import { Socket } from 'socket.io';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ChatController {
  async createMessage(data: Array<{ author_id: number, msg: string }>) {
    
    const message = new Message()

    for (const el of data) {
      await message 
        .fill({
          author_id: el.author_id,
          message: el.msg
        })
        .save()
    }

    // this.sendDataToClient('server:send-message', data)
  }

  async readMessagesDb()  {
    const messagesDbRes = await Message.all()
    const messagesTable: Object[] = []

    for (const data of messagesDbRes) {
      messagesTable.push({ authorId: data.author_id, msg: data.message })
    }

    return messagesTable
  }

  async firstConnectionData() {

    const messagesTable = await this.readMessagesDb();

    this.sendDataToClient('server:send-message', messagesTable)
  }

  async showChat({ view, session }: HttpContextContract) {

    this.firstConnectionData()

    const authorId = session.get('authorId');
    const username = session.get('username');
    
    return view.render('app/chat/main', {
      user: { id: authorId, username: username }
    })
  }

  async sendDataToClient(evt: string, data: Array<object>) {
    
    const emitter = (socket: Socket) => {
      socket.emit(evt, data)

      socket.on('disconnect', () => {
        Ws.io.off('connection', emitter)
      })
    }

    Ws.io.on('connect', emitter);
  }
}
