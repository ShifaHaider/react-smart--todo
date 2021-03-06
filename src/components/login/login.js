import React, {Component} from 'react';
import firebase from "firebase";
import Dashboard from "../dashboard/dashboard";
import '../../index.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginData: {
                logEmail: '',
                logPassword: ''
            },
            message: '',
            isAlertOpen: false
        }
    }

    loginAccount() {
        firebase.auth().signInWithEmailAndPassword(this.state.loginData.logEmail,
            this.state.loginData.logPassword)
            .then((data) => {
                console.log(localStorage.setItem('Id', data.uid));
                this.props.history.push('/dashboard');

            })
            .catch((error) => {
                this.setState({message: error.message, isAlertOpen: true});
            });
    }

    handleChangeLog(p, e) {
        var loginData = this.state.loginData;
        loginData[p] = e.target.value;
        this.setState({loginData: loginData})
    }

    Register() {
        console.log(this.props);
        this.props.history.push('/register')
    }

    close() {
        this.setState({isAlertOpen: false});
    }



    render() {
        return (
            <div>
                <AppBar title='Login'/>
                <TextField
                    hintText="Email Field"
                    floatingLabelText="Email"
                    type="text"
                    value={this.state.loginData.logEmail}
                    onChange={this.handleChangeLog.bind(this, 'logEmail')}/><br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.loginData.logPassword}
                    onChange={this.handleChangeLog.bind(this, 'logPassword')}/><br/>
                <RaisedButton label='Login' secondary={true} onClick={this.loginAccount.bind(this)}/><br/><br/>
                <RaisedButton label='Register' primary={true} onClick={this.Register.bind(this)}/>


                <Dialog
                    actions={<FlatButton
                        label="Cancel"
                        primary={true}
                        onClick={this.close.bind(this)}/>}
                    modal={false}
                    open={this.state.isAlertOpen}>
                    {this.state.message}
                </Dialog>
            </div>
        )
    }
}

export default Login;
