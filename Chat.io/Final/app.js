const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3000;

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/chat', (req, res) => {
    res.render('chat.ejs', {dados: req.body});
});

// Socket.io
io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', {msg: data.msg, nick: data.nick, color: data.color});
    });
});

http.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});