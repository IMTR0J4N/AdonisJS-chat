import io from 'socket.io-client';

const socket = io();

const username = prompt('Choose a username');

const chatInput = document.getElementById('chatInput');

chatInput.addEventListener('submit', () => send(username, chatInput.value));

const send = (author, msg) => {
    socket.emit('message', { author, msg })
}

socket.on('incoming-message', (data) => {
    console.log(data);
})

const displayMessage = (author, msg) => {

    const messagesList = document.getElementById('messagesList');
    const newContainer = document.createElement('li');
    const newMessage = document.createElement('p');
    newContainer.classList.add('message--container');
    newContainer.appendChild(newMessage);
    newMessage.innerText = msg
    newMessage.classList.add(`${author === username ? "outgoing-messages" : "incoming-messages"}`);

    messagesList.appendChild(newMessage);
}