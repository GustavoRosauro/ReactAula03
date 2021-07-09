import {Component} from 'react'

class API extends Component{
    constructor(props){
        super(props)
        this.state = {
            nome:'',
            idade:0
        }
        this.loadPerson = this.loadPerson.bind(this)
        this.loadPerson();        
    }
    loadPerson = async() =>{
        let pessoa = await fetch('http://localhost:8001/pessoa').then(resp => resp.json())
        this.setState({['nome']:pessoa.nome,
                        ['idade']:pessoa.idade})
    }
    render(){
        return(
            <div className='col-md-6'>
                <label>Nome</label>
                <input className='form-control' name='nome' value={this.state.nome} disabled/>
                <label>Idade</label>
                <input className='form-control' name='idade' value={this.state.idade} disabled/>
            </div>
        )
    }
}
export default API;