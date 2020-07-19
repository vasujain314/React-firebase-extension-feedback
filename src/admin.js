import React, { Component } from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnData: [],
            isLoaded: false,
            reason: ""
        }
    }
    componentDidMount() {
        var url = this.props.history
        var user = localStorage.getItem('user')
        if (!user) {
            url.push('/adminlogin');
            return;
        }
    }
    Change = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
        });
    }
    logOut = (e) => {
        var url = this.props.history
        // var user= localStorage.getItem('user')
        localStorage.clear();
        url.push('/adminlogin');
        return;

    }
    create = (e) => {
        firebase.database().ref(localStorage.getItem('user')).child(this.state.reason).set({
            count: 0
        }).then((data) => {
            //success callback
            console.log('data ', data)
            alert('Thanks for your submission');
        }).catch((error) => {
            //error callback
            console.log('error ', error)
        })
    }
    getStats = (e) => {
        var url = this.props.history
        var user = localStorage.getItem('user')
        document.getElementById('loading').style.display = "block";
        var res;
        if (!user) {
            url.push('/adminlogin');
            return;
        }
        var x=this;
        firebase.database().ref(user).on("value", function (snapshot) {
            res = snapshot.val();
            document.getElementById('loading').style.display = "none";
            x.setState({
                returnData: res,
                isLoaded: true
            })
        })       
    }

    render() {
        var home = this.state.returnData;
        console.log(home);
        let itemsToRender=[];
        if (home) {
        let c;
        for (c in home) {             
            itemsToRender.push(<li>{c}  {home[c].count}</li>);   
       }
          
        }
        return (
            <div className='container'>
                <br/><br/>
                <Button variant="contained" color="secondary" style={{ float: "right" }} onClick={this.logOut}>Logout</Button>
                <div className='container'>
                    <h3 style={{marginLeft:'25%'}}>Welcome {localStorage.getItem('user')} to your dashboard</h3>
                    
                    
                    <br />
                    <Button variant="contained" color="secondary" onClick={this.getStats}>Get Stats</Button>

                </div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-5 card'>
                            <p id='loading' style={{ display: "none", textAlign: 'center' }}>loading</p>
                            <div><ul>{itemsToRender}</ul></div>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className='col-lg-5 card' style={{
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "2%"
                        }}>
                            <form noValidate autoComplete="off" >
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Reason</InputLabel>
                                    <Input id="my-input" aria-describedby="my-helper-text1" onChange={this.Change} value={this.state.value} name="reason" />
                                </FormControl>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.create}>Create</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Admin;