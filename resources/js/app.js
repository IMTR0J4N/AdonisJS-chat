
import io from 'socket.io-client'

const socket = io()

const username = prompt('Choose a username')

 socket.on('server:send-message', (content) => {
   for (const i of content.reverse()) {
     createNewMessage(i)
   }
 }) 

const chatInput = document.getElementById('chatInput')
const sendMessageBtn = document.getElementById('sendMessageBtn')

const messagesList = document.getElementById('messagesList')

sendMessageBtn.addEventListener('click', () => {
  send(username, chatInput.value)
  chatInput.value = ''
})

chatInput.addEventListener('keypress', (e) => {
  if (e.code === 'Enter') {
    send(username, chatInput.value)
    chatInput.value = ''
  } else return
})

const send = (author, msg) => {
  const content = [{ author, msg }]
  socket.emit('client:send-message', content)
}

const createNewMessage = (data) => {
  
  messagesList.innerHTML += `
  <li class="message--container">
      <p class=${data.author === username ? "outgoing-messages" : "incoming-messages"}>${data.msg}<p>
    <li>
  `
  
  messagesList.scrollTop = messagesList.scrollHeight
}