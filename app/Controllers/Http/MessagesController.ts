import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';

export default class MessagesController {
  async create(data: { author: string; msg: string }) {
    const message = new Message()

    await message
      .fill({
        author: data.author,
        message: data.msg,
      })
      .save()
      
  }

  async updateMessagesList({ view }: HttpContextContract) {
    const messagesDbRes = await Message.all()
    const messagesArray: String[] = [];

    for (const data of messagesDbRes) {
      messagesArray.push(data.message)
    }

    console.log(messagesArray)

    return view.render('chat', {
      messagesArray
    })
  }
}
