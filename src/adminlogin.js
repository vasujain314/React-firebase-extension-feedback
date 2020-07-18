import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class Loginform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.Change = this.Change.bind(this);
        this.press = this.press.bind(this);
    }
    Change(e) {

        let nam = e.target.name;
        let val = e.target.value;
        this.setState({ [nam]: val });

    }
    press(e) {
        e.preventDefault();
        var url = this.props.history
        if (e.target.innerText === "submit") {
            var password = this.state.password;
            firebase.database().ref('users').child(this.state.username).on("value", function (snapshot) {
                console.log(snapshot.val().password);
                console.log(snapshot.val().extension);
                if(password === snapshot.val().password)
                {
                    localStorage.setItem('user',snapshot.val().extension);     
                    url.push('/admin');
                }
            });
        }
    }
    render() {
        return (
            <div>
                {/* <div className='jumbotron'><h1 style={{ textAlign: 'center' }}>{this.props.match.params.extension} </h1></div> */}
                <div className='container'>
                    <form className="center">
        <h4>Hello {this.state.username}</h4>
                        <div className="col-md-4 center boundary">
                            <div className="form-row">
                                <div><p>Admin login</p></div>
                                <br />
                                <div className="form-group col-md-11 center Text-center">
                                    <label>
                                        UserName:
                                     <input type="text" onChange={this.Change} name="username" />
                                    </label>
                                </div>
                                <div className="form-group col-md-11 center Text-center">
                                    <label>
                                        Password:
                                     <input type="text" onChange={this.Change} name="password" />
                                    </label>
                                </div>
                            </div>
                            <div className="form-row center">
                                <div className="form-group col-md-5 center text-center">
                                    <button type="submit" onClick={this.press} className="btn btn-primary ">submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Loginform;