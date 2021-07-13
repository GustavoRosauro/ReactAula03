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
        this.setState({['lista']:lista})
    }
    render(){
        const handleInputChanged = (e)=>{
            const {name,value} = e.target;
            this.setState({[name]:value})            
        }
        const savePerson = (e)=>{
            let pessoa = {
                nome:this.state.nome,
                idade:parseInt(this.state.idade)
            }
            console.log(pessoa)
            fetch('/pessoa',{
                method:'POST',
                body:JSON.stringify(pessoa),
                headers:{'Content-Type':"application/json"} 
            }).then(()=>{
                this.loadPerson();
            })
        }
        return(
            <div className='col-md-6'>
                <label>Nome</label>
                <input name='nome' className='form-control' value={this.state.nome} onChange={handleInputChanged}/>
                <label>Idade</label>
                <input name='idade' className='form-control' value={this.state.idade} onChange={handleInputChanged}/>
                <button className='btn btn-success btn-sm mt-5' onClick={()=> savePerson()}>Salvar</button>
                <br/>
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