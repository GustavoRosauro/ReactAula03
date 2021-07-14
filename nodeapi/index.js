
const express = require('express')
const app = express();
const Pessoa = require('./pessoa')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next()
})
//evitar no futuro seguir esse exemplo abaixo sempre que puder utilizar rotas
//exemplo didático
app.get('/pessoa', (req, res) => {
    Pessoa.findAll().then((pessoas) => {        
        res.json(pessoas);
    })
})
app.post('/pessoa',(req,res)=>{   
    Pessoa.create({
        nome:req.body.nome,
        idade:req.body.idade
    })
    res.end("ok")
})
app.get('/pessoa/:id',(req,res)=>{
    Pessoa.findAll({where:{'id':req.params.id}}).then((pessoa)=>{        
        res.json(pessoa[0].dataValues);
    })
})
app.put('/pessoa/:id',(req,res)=>{
    Pessoa.update(
        {
            nome:req.body.nome,
            idade:req.body.idade
        },
        {where:{'id':req.params.id}}
    )
    res.end("alterado")
})
app.delete('/pessoa/:id',(req,res)=>{
    Pessoa.destroy({where:{'id':req.params.id}});
    res.end('removido')
})
app.listen(8001, () => {
    console.log('porta 8001')
})