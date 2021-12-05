import React from "react";
import Login from "../views/login";
import Home from "../views/home";
import AuthService from "../app/service/authService";
import CadastroUsuario from "../views/cadastroUsuario";
import consultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

import { Route, Switch , HashRouter, Redirect} from "react-router-dom";

function RotaAutenticada({component: Component, ...props }){
    return(
        <Route { ...props} render={ (componentProps) => {
            if(AuthService.isUsuarioAutenticado()){
                return (
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={{pathname: '/login', state : { from: componentProps.location}}} />
                )
            }
        }} />
    )
}

function Rotas(){
    return(
        <HashRouter>
            <Switch>                
                <Route component={Login} path="/login" />
                <Route component={CadastroUsuario} path="/cadastro-usuario"/>
                <RotaAutenticada component={Home} path="/home" />  
                <RotaAutenticada component={consultaLancamentos} path="/consulta-lancamentos"/> 
                <RotaAutenticada component={cadastroLancamentos} path="/cadastro-lancamentos/:id?"/>               
            </Switch>
        </HashRouter>
    )
}
export default Rotas