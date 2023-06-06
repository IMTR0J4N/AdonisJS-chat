/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
    Route.get('/chat', 'ChatController.showChat').as('chat');
}).middleware('auth');

Route.get('/', async (ctx) => {
    ctx.response.redirect().toRoute('login');
})

Route.get('/login', 'SecurityController.login').as('login');
Route.post('/login', 'SecurityController.doLogin');

Route.get('/register', 'SecurityController.register').as('register');
Route.post('/register', 'SecurityController.doRegister');
