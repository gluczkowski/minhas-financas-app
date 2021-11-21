import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"

class CadastroUsuario extends React.Component{
    state = {
        nome: '',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    cadastrar = () => {
        console.log(this.state)
    }

    cancelar = () => {
        this.props.history.push("/login")
    }

    render(){
        return (            
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label= "Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        id="inputNome"
                                        className="form-control" 
                                        name="nome"
                                        placeholder="Insira o nome"
                                        onChange={e => this.setState({nome: e.target.value})}  />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                        <input type="email"
                                            id="inputEmail"
                                            name="email"
                                            placeholder="Insira o e-mail"
                                            className="form-control" 
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                        id="inputSenha"
                                        name="senha"
                                        placeholder="Insira a senha"
                                        className="form-control"
                                        onChange={e => this.setState({senha:e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup label="Confirme a senha: *" htmlFor="inputConfirmeSenha">
                                <input type="password"
                                        id="inputConfirmeSenha"
                                        name ="senha"
                                        placeholder="Confirmação da senha"
                                        className="form-control"
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})}                                            
                                />
                            </FormGroup>
                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                        </div>                        
                    </div>
                </div>
            </Card>            
        )
    }
}

export default withRouter(CadastroUsuario)