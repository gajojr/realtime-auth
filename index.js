const express = require('express');
const app = express();
// const auth = require('./middleware/auth');
const { registerUser, dbConnection } = require('./db/mongoose');

const PORT = process.env.PORT || 3000;

app.use(express.json());
dbConnection();

app.get('/', (req, res) => {
    res.json({
        key: "value"
    });
});

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

app.listen(PORT);