import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './css/App.css';
import * as firebase from 'firebase';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button } from '@material-ui/core';

class Loginform extends Component {
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
    }
    componentDidMount() {
        var url = this.props.history
        var user = localStorage.getItem('user')
        if (user) {
            url.push('/admin');
            return;
        }
    }
 
    press(e) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        e.preventDefault();
        console.log('return');
        var url = this.props.history
            console.log('return');
            // var password = this.state.password;
            firebase.database().ref('users').child(username).on("value", function (snapshot) {
                console.log(snapshot.val().password);
                console.log(snapshot.val().extension);
                if (password === snapshot.val().password) {
                    localStorage.setItem('user', snapshot.val().extension);
                    url.push('/admin');
                }
            });
        
    }

    render() {
        return (
            <div>
            <div className='jumbotron'>
                <h3 style={{textAlign:'center'}}>Admin Dashboard</h3>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <form noValidate autoComplete="off">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Username</InputLabel>
                        <Input id="username" aria-describedby="my-helper-text1" value="requestly" name="username" />
                    </FormControl>
                    <br></br>
                    <FormControl>
                        <InputLabel htmlFor="my-input2">password</InputLabel>
                        <Input id="password" aria-describedby="my-helper-text2"  value ="Adminrequestly" name="password" />
                    </FormControl>
                    <br/><br/>
                        <Button type="Login" variant="contained" color="primary" onClick={this.press}>Login</Button>
                </form>
            </div>
            </div>
        );
    }
}


export default Loginform;