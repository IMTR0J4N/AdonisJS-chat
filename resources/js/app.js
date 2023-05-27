import io from 'socket.io-client'

const socket = io()

const username = prompt('Choose a username')

const chatInput = document.getElementById('chatInput')
const sendMessageBtn = document.getElementById('sendMessageBtn')

const messagesList = document.getElementById('messagesList');

sendMessageBtn.addEventListener('click', () => {
  console.log(username, chatInput.value)
  send(username, chatInput.value)
})

const send = (author, msg) => {
  socket.emit('message', { author, msg })
}
