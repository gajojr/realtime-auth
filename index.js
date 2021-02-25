require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const socketioJwt = require('socketio-jwt');
// const auth = require('./middleware/auth');
const { registerUser, dbConnection } = require('./db/mongoose');

const PORT = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, './public');

app.use(express.json());
app.use(express.static(publicDirectoryPath));

dbConnection();

io.on('connection', socket => {
    socket.on('authenticate', token => {
        socketioJwt.authorize({
            secret: process.env.JWT_KEYWORD,
            timeout: 15000 // 15 seconds to send the authentication message
        })

        socket.emit('authenticated', 'ack');
    });

    // socket.on('authenticated', socket => {
    //     //this socket is authenticated, we are good to handle more events from it.
    //     console.log(`Hello! ${socket.decoded_token.name}`);
    // });
});

// app.get('/', (req, res) => {
//     res.json({
//         key: "value"
//     });
// });

app.post('/register', async(req, res) => {
    try {
        const user = await req.body;
        const token = await registerUser(user);
        res.send({ user, token });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

server.listen(PORT);