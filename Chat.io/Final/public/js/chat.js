const socket = io();
const header = document.querySelector('#chat-header');
const dados = document.querySelector('#dados');
const feed = document.querySelector('#feed');
const form = document.querySelector('#msg-input');
const msg = document.querySelector('#m');

header.style.backgroundColor = dados.dataset.color;

form.addEventListener('submit', (event) => {
    if(msg != ''){
        event.preventDefault();
        const li = document.createElement('li');
        li.innerHTML = `<strong style='color: ${dados.dataset.color}'> ${dados.dataset.nick}: </strong> ${msg.value}`;
        feed.appendChild(li);
        socket.emit('chat message', {msg: msg.value, nick: dados.dataset.nick, color: dados.dataset.color});
        msg.value = '';
    }
    return false;
}, true);


socket.on('chat message', (data) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong style='color: ${data.color}'> ${data.nick}: </strong> ${data.msg}`;
    feed.appendChild(li);
});