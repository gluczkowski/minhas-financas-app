import React from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { withRouter } from "react-router-dom"

import UsuarioService from "../app/service/usuarioService";
import { mensagemSucesso, mensagemErro} from "../components/toastr"

class CadastroUsuario extends React.Component{
    state = {
        nome: '',
        email:'',
        senha:'',
        senhaRepeticao:''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar(){
        const msgs = []
        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório.')
        }
        if(!this.state.email ){
            msgs.push('O campo Email é obrigatório')
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um e-mail válido')
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2 x')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem')
        }

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();
        if (msgs && msgs.length > 0){
            msgs.forEach((msg, index) =>{
                mensagemErro(msg)
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha:this.state.senha
        }

        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso('Usuário cadastrado com sucesso!')
                this.props.history.push("/login")
            }).catch(error => {
                mensagemErro(error.response.data)
            })
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