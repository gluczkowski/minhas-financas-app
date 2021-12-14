import React from "react";
import Login from "../views/login";
import Home from "../views/home";
import CadastroUsuario from "../views/cadastroUsuario";
import consultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import cadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import { AuthConsumer } from "./provedorAutenticacao";
import landinPage from "../views/landinPage";

import { Route, Switch , HashRouter, Redirect} from "react-router-dom";

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props } ) {
    return(
        <Route exact { ...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
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

function Rotas(props){
    return(
        <HashRouter>
            <Switch> 
                <Route component={LandingPage} exact path="/" />               
                <Route component={Login} exact path="/login" />
                <Route component={CadastroUsuario} exact path="/cadastro-usuario"/>


                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} component={Home} path="/home" />  
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} component={consultaLancamentos} path="/consulta-lancamentos"/> 
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} component={cadastroLancamentos} path="/cadastro-lancamentos/:id?"/>               
            </Switch>
        </HashRouter>
    )
}
export default () => (
    <AuthConsumer>
        { (context) => ( <Rotas isUsuarioAutenticado={context.isAutenticado} />)  }
    </AuthConsumer>
)