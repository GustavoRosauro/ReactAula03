const express = require('express')
const app = express();
const http = require('http')
app.use(express.urlencoded({extended:true}))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next()
})

app.get('/pessoa',(req,res)=>{
    let pessoa = {
        nome:'Gustavo',
        idade: 29
    }
    res.end(JSON.stringify(pessoa));
})

app.listen(8001,()=>{
    console.log('porta 8001')
})
const server = http.createServer(app);
app.use(express.json())