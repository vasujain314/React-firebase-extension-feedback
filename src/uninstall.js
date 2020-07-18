import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDFPgLiaM29uceuwJdh8Vry4GhhZa9s7-E",
    authDomain: "my-project-1537699994266.firebaseapp.com",
    databaseURL: "https://my-project-1537699994266.firebaseio.com",
    projectId: "my-project-1537699994266",
    storageBucket: "my-project-1537699994266.appspot.com",
    messagingSenderId: "883808156358",
    appId: "1:883808156358:web:4ec2400eb88825e90eb5c7",
    measurementId: "G-FGRMGE4XQ8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Uninstallform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: ''
        }
        this.Change = this.Change.bind(this);
        this.press = this.press.bind(this);
    }
    Change(e) {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
        });
    }
    press(e) {
        e.preventDefault();
        var userId = 0;
        var starCountRef = firebase.database().ref(this.props.match.params.extension);
                starCountRef.on('value', function (snapshot) {
                    console.log(snapshot.val());
                    userId= snapshot.val().length;
        });
        if (e.target.innerText === "submit") {
            this.setState({
                redirect: true,
            }, () => {    
                firebase.database().ref(this.props.match.params.extension).child(userId).set({
                    reason: this.state.reason
                }).then((data) => {
                    //success callback
                    console.log('data ', data)
                    alert('Thanks for your submission');
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                })
            })
        }
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <div className='jumbotron'><h1 style={{ textAlign: 'center' }}>{this.props.match.params.extension} </h1></div>
                <div className='container'>
                    <form className="center">
                        <div className="col-md-4 center boundary">
                            <div className="form-row">
                                <div><p>Please state reason for uninstalling {this.props.match.params.extension}</p></div>
                                <br />
                                <div className="form-group col-md-11 center Text-center">

                                    <select value={this.state.value} onChange={this.Change} name="reason" style={{ width: 300 + 'px' }}>
                                        <option value="">choose a reason</option>
                                        <option value="Extension is costly">Extension is costly</option>
                                        <option value="Not useful">Not useful</option>
                                        <option value="its confusing">its confusing</option>
                                    </select>
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
export default Uninstallform;