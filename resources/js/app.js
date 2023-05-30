import io from 'socket.io-client'

const socket = io()

const username = prompt('Choose a username')

const chatInput = document.getElementById('chatInput')
const sendMessageBtn = document.getElementById('sendMessageBtn')

const messagesList = document.getElementById('messagesList')


sendMessageBtn.addEventListener('click', () => { send(username, chatInput.value); chatInput.value = "" })
chatInput.addEventListener('keypress', (e) => {
  if (e.code === "Enter") {
    send(username, chatInput.value)
    chatInput.value = ""
  } else return
})

const send = (author, msg) => {
  console.log(true)
  socket.emit('client:send-message', { author, msg })
}
  socket.on('server:send-message', (content) => {
    console.log(content)
    createNewMessage(content)
  })

const createNewMessage = (data) => {
  if (Array.isArray(data)) {
    for (const el of data) {
      
      const newMessageContainer = document.createElement('li')
      const newMessage = document.createElement('p')
      
      newMessageContainer.classList.add('message--container')
      
      newMessage.classList.add(el.author === username ? 'outgoing-messages' : 'incoming-messages')
      newMessage.innerText = el.msg
      
      newMessageContainer.appendChild(newMessage)
      
      messagesList.appendChild(newMessageContainer)
      
    }
  } else if (typeof data === typeof {}) {
    
    const newMessageContainer = document.createElement('li')
    const newMessage = document.createElement('p')
    
    newMessageContainer.classList.add('message--container')
    
    newMessage.classList.add(data.author === username ? 'outgoing-messages' : 'incoming-messages')
    newMessage.innerText = data.msg
    
    newMessageContainer.appendChild(newMessage)
    
    messagesList.appendChild(newMessageContainer)
  }
  messagesList.scrollTop = messagesList.scrollHeight
}
