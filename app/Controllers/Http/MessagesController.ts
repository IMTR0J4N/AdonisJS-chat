// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'

export default class MessagesController {

   public async create (data: {author: string, msg: string}) {
        const message = new Message()

        await message.fill({
            author: data.author,
            message: data.msg
        }).save();
    }
}
