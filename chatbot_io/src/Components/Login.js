import React from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'

export default class Login extends React.Component {

	constructor(props) {
		super(props)
        this.state = {
            setLogin: u => {
                localStorage.setItem('username', u)
                props.setLogin()
            }
        };
    }

	render() {

        const Styles = {
            mainContainer: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh"
                
            },
            loginBtn: {
                marginTop: "20px"
            }
        };


        return (
            <Container style={Styles.mainContainer} >

               <TextField
                id="pseudo-input"
                label="Votre pseudo"
                defaultValue="Anonymous"
                variant="outlined"
                />

                <Button style={Styles.loginBtn} variant="contained" color="primary" onClick={() => this.state.setLogin(document.getElementById('pseudo-input').value)}>
                    Rejoindre le chat
                </Button>
            </Container>
        );
    }
}