import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SecuritiesController {

  public async login({ view }: HttpContextContract) {
    return view.render('app/auth/login')
  }

  public async doLogin({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    
    try {
      await auth.use('web').attempt(email, password)
      
      const authorId = await Database.rawQuery('SELECT id FROM users WHERE email = ? ', [email])
      const username = await Database.rawQuery('SELECT username FROM users WHERE email = ? ', [email])

      session.put('authorId', authorId[0].id);
      session.put('username', username[0].username);

      response.redirect().toRoute('chat');
    } catch {
      console.log('incorrect id')
      response.redirect().toRoute('login');
    }
  } 

  public async register({ view }: HttpContextContract) {
    return view.render('app/auth/register')
  }

  public async doRegister({ request, response }: HttpContextContract) {

    const schemaReq = schema.create({
      username: schema.string(),
      email: schema.string({}, [rules.email()]),
      password: schema.string()
    })

    const { username, email, password } = await request.validate({
      schema: schemaReq,
      messages: {
        required: 'Merci de préciser un email valide'
      }
    })

    User.create({
        username: username,
        email: email,
        password: password
      })
      response.redirect().toRoute('login')
  }
}
