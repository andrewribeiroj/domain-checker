const express = require('express')
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get('/', (req,res) => {
    return res.send({ message: '200' })
})

// Controllers
require('./controllers/export')(app)

module.exports = app;