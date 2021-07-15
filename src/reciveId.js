import { Component } from "react";
class RecivedId extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:props.match.params.id
        }
    }
    render(){
        return(
            <h1>{this.state.id}</h1>
        )
    }
}
export default RecivedId;