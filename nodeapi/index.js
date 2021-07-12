
const express = require('express')
const app = express();
const Pessoa = require('./pessoa')
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next()
})
app.get('/pessoa', (req, res) => {
    Pessoa.findAll().then((pessoas) => {        
        res.json(pessoas);
    })
})

app.listen(8001, () => {
    console.log('porta 8001')
})
app.use(express.json())