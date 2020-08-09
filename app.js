const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Message board!'
    });
});

app.get('/messages', (req, res) => {
    messages.getAll()
    .then((messages) => {
        res.json(messages);
    });
});

app.post('/messages', async (req, res) => {
    await messages.create(req.body)
    .then((message) => {
        res.json(message);
    }).catch((error) => {
        res.status(500);
        res.json(error);
    });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Runnin on ${process.NODE_ENV}. listining on ${port}`);
})