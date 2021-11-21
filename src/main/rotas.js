import React from "react";
import Login from "../views/login";
import Home from "../views/home";
import CadastroUsuario from "../views/cadastroUsuario";

import { Route, Switch , HashRouter} from "react-router-dom";

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route component={Home} path="/home" />
                <Route component={Login} path="/login" />
                <Route component={CadastroUsuario} path="/cadastro-usuario"/>                
            </Switch>
        </HashRouter>
    )
}
export default Rotas