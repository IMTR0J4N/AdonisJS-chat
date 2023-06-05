import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecuritiesController {

  public async login({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async doLogin({ request, auth, response, session }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)

      response.redirect().toRoute('main');
    } catch {
      session.flash({error: "Identifiants incorrect"})
      response.redirect().toRoute('login');
    }
  } 
}
