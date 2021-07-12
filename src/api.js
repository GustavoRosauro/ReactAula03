import {Component} from 'react'

class API extends Component{
    constructor(props){
        super(props)
        this.state = {
            nome:'',
            idade:0,
            lista:[]
        }
        this.loadPerson = this.loadPerson.bind(this)
        this.loadPerson();        
    }
    loadPerson = async() =>{
        let lista = await fetch('/pessoa').then(resp => resp.json())
        console.log(lista)
        this.setState({['lista']:lista})
    }
    render(){
        return(
            <div className='col-md-6'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Idade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(x => 
                            <tr key={x.id}>
                                <td>{x.nome}</td>
                                <td>{x.idade}</td>
                            </tr>    
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default API;