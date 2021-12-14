import React from 'react'
import { withRouter} from 'react-router-dom'

class LandingPage extends React.Component {

    goToHomePage= () => {
        this.props.history.push("/login")
    }

    render(){
        return(
            <div className='container text-center'>
                <h2>Bem vindo ao sistema Minhas Finanças</h2>
                Este é seu sistema para controle de finanças pessoais,
                clique no botão abaixo para acessar o sistea : <br/><br/>

                <div className='offset-md4 col-md-4'>
                    <button onClick={this.goToHomePage} style={{width:'100%'}} className='btn btn success'>
                        <i className='pi pi-sign-in'></i>Acessar
                    </button>
                </div>

            </div>
        )
    }

}

export default withRouter(LandingPage)