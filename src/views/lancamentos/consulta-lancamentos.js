import React from "react";
import { withRouter } from 'react-router-dom'
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localstorageService";

import * as messags from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if(!this.state.ano){
            messags.mensagemErro('O preenchimento do campo ano é obrigatório')
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro ={
            ano: this.state.ano,
            mes:this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then( resposta => {
                this.setState({lancamentos : resposta.data })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log(id)
    }

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id)
        .then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento)
            lancamentos.splice(index, 1);
            this.setState(lancamentos)
            messags.mensagemSucesso("Lançamento deletado com sucesso!");
        }).catch(error => {
            messags.mensagemErro("Ocorreu um erro!");
        })
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();               
        
        return(
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                        className="form-control" 
                                        id="inputAno"  
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})}                                      
                                        placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: *">                                
                                <SelectMenu id="inputMes" 
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})}
                                            className="form-control" 
                                            lista={meses} />                               
                            </FormGroup> 
                            <FormGroup htmlFor="inputDescricao" label="Descrição:">
                                <input type="text"
                                        className="form-control" 
                                        id="inputDescricao"  
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})}                                      
                                        placeholder="Digite uma descrição" />
                            </FormGroup>                            
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">                                
                                <SelectMenu id="inputTipo"
                                            value={this.state.mes}
                                            onChange={e => this.setState({tipo: e.target.value})} 
                                            className="form-control" 
                                            lista={tipos} />                               
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>                           
                            <button type="button" className="btn btn-danger">Cadastrar</button> 
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} 
                            deleteAction={this.deletar}
                            editAction={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter (ConsultaLancamentos);