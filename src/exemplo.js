import {Component} from 'react'

class Exemplo extends Component{
    constructor(props){
        super(props)
        this.state = {
            imagem:'',
            nome:'',
            telefone:''
        }
    }
    render(){
        const loadUser = async () =>{
            let json = await fetch('https://randomuser.me/api/').then(resp => resp.json())
            this.setState({['imagem']:json.results[0].picture.large,
                            ['nome']:json.results[0].name.first + ' ' + json.results[0].name.last,
                            ['telefone']:json.results[0].phone})
        }
        return(
            <div className='col-md-6'>
                <img src={this.state.imagem}/>
                <br/>
                <label>Nome</label>
                <input className='form-control' value={this.state.nome} disabled/>
                <label>Telefone</label>
                <input className='form-control' value={this.state.telefone} disabled/>
                <button className='btn btn-info btn-sm' onClick={()=> loadUser()}>Referesh</button>
            </div>
        )
    }
}
export default Exemplo;