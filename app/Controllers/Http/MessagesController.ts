// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import View from '@ioc:Adonis/Core/View';
import Message from 'App/Models/Message'

export default class MessagesController {
  async create(data: { author: string; msg: string }) {
    const message = new Message()

    await message
      .fill({
        author: data.author,
        message: data.msg,
      })
      .save()

      console.log(this.readMessagesDb());
  }

  async readMessagesDb() {
    const messages = await Message.all()

    return messages
  }

  async updateMessagesList() {
    const messages = Promise.resolve(await this.readMessagesDb())

    console.log(await messages)

    return View.render('chat', await messages)
  }
}
