import Message from 'App/Models/Message'
import Ws from 'App/Services/Ws'
import { Socket } from 'socket.io';

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import type { SessionContract } from '@ioc:Adonis/Addons/Session';

export default class ChatController {
  async createMessage(data: Array<{ author: string, msg: string }>) {
    
    const message = new Message()

    // for (const el of data) {
    //   await message
    //     .fill({
    //       authorId: el.author,
    //       message: el.msg
    //     })
    //     .save()
    // }

    // this.sendDataToClient('server:send-message', data)
  }

  async readMessagesDb()  {
    const messagesDbRes = await Message.all()
    const messagesTable: Object[] = []

    for (const data of messagesDbRes) {
      messagesTable.push({ authorId: data.authorId, author: data.author, msg: data.message })
    }

    return messagesTable
  }

  async firstConnectionData() {

    const messagesTable = await this.readMessagesDb();
  
    this.sendDataToClient('server:send-message', messagesTable)
  }

  async showChat({ view }: HttpContextContract) {
    this.firstConnectionData()
    return view.render('app/chat/main')
  }

  async sendDataToClient(evt: string, data: Array<object>) {
    
    const emitter = (socket: Socket) => {
      console.log(true, 'toSend');
      socket.emit(evt, data)

      socket.on('disconnect', () => {
        Ws.io.off('connection', emitter)
      })
    }

    Ws.io.on('connect', emitter);
  }
}
