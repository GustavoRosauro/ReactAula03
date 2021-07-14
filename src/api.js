import { Component } from 'react'

class API extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            idade: 0,
            id: 0,
            lista: []
        }
        this.loadPerson = this.loadPerson.bind(this)
        this.loadPerson();
    }
    loadPerson = async () => {
        let lista = await fetch('/pessoa').then(resp => resp.json())
        this.setState({ ['lista']: lista })
    }
    render() {
        const handleInputChanged = (e) => {
            const { name, value } = e.target;
            this.setState({ [name]: value })
        }
        const savePerson = (e) => {
            if (this.state.id !== 0) {
                editPerson();
            }
            else {
                let pessoa = {
                    nome: this.state.nome,
                    idade: parseInt(this.state.idade)
                }
                fetch('/pessoa', {
                    method: 'POST',
                    body: JSON.stringify(pessoa),
                    headers: { 'Content-Type': "application/json" }
                }).then(() => {
                    this.loadPerson();
                    clearFields();
                })
            }
        }
        const removePerson = (id)=>{
            fetch(`/pessoa/${id}`,{
                method:'DELETE',
            }).then(()=>{
                this.loadPerson();
            })
        }
        const editPerson = () => {
            let pessoa = {
                nome: this.state.nome,
                idade: parseInt(this.state.idade)
            }
            fetch(`/pessoa/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(pessoa),
                headers: { "Content-Type": "application/json" }
            }).then(() => {
                this.loadPerson()
                this.setState({ ['id']: 0 })
                clearFields();
            })
        }
        const clearFields = () => {
            this.setState({
                ['nome']: '',
                ['idade']: 0
            })
        }
        const returnPersonById = async (id) => {
            let pessoa = await fetch(`/pessoa/${id}`).then(resp => resp.json());
            this.setState({
                ['nome']: pessoa.nome,
                ['idade']: pessoa.idade,
                ['id']: id
            })
        }
        return (
            <div className='col-md-6'>
                <label>Nome</label>
                <input name='nome' className='form-control' value={this.state.nome} onChange={handleInputChanged} />
                <label>Idade</label>
                <input name='idade' className='form-control' value={this.state.idade} onChange={handleInputChanged} />
                <button className='btn btn-success btn-sm mt-5' onClick={() => savePerson()}>Salvar</button>
                <br />
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
                                <td><button className='btn btn-warning btn-sm' onClick={() => returnPersonById(x.id)}>Editar</button></td>
                                <td><button className='btn btn-danger btn-sm' onClick={() => removePerson(x.id)}>Remover</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default API;