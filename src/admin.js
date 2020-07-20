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
            reason: "",
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
        console.log(e.target.value)
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
    Updatez = (a) => {
        console.log("param A" + a);
        var b= document.getElementById(a).value
        if (window.confirm('Are you sure want to update this?')) {
           
        var extensionref = firebase.database().ref(localStorage.getItem('user'));
        extensionref.once('value').then(function (snap) {
            var data = snap.val();
            console.log(data);
            console.log(data[a]);
            var update = {};
            update[a] = null;
            update[b] = data[a];
            return extensionref.update(update);
        });
        alert("successfully updated");
        document.getElementById(a).value='';
        }
    }
    Deletez = (a) => {
        console.log(a);
        console.log("param A" + a);
        if (window.confirm('Are you sure want to update this?')) {
        var extensionref = firebase.database().ref(localStorage.getItem('user'));
        extensionref.once('value').then(function (snap) {
            var update = {};
            update[a] = null;
            return extensionref.update(update);
        });
        alert("Successfully Deleted");
    }
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
        var x = this;
        firebase.database().ref(user).on("value", function (snapshot) {
            res = snapshot.val();
            document.getElementById('loading').style.display = "none";
            x.setState({
                returnData: res
            })
        })
    }

    render() {
        var home = this.state.returnData;
        let itemsToRender = [];
        if (home) {
            let c;
            for (c in home) {
                itemsToRender.push(<div style={{ margin: 20 + 'px' }}><FormControl><input style={{ margin: 10 + 'px' }} id={c} placeholder={c} /></FormControl>
                    <FormControl><input style={{ width: 30 + 'px', margin: 10 + 'px' }} value={home[c].count} type='text' disabled /></FormControl>
                    <Button style={{ margin: 10 + 'px' }} variant="contained" color="primary" onClick={this.Updatez.bind(this, c)}>Update</Button>
                    <Button style={{ margin: 10 + 'px' }} variant="contained" color="primary" onClick={this.Deletez.bind(this, c)}>Delete</Button>
                </div>);
            }

        }
        return (
            <div className='container'>
                <br /><br />
                <Button variant="contained" color="secondary" style={{ float: "right" }} onClick={this.logOut}>Logout</Button>
                <div className='container'>
                    <h3 style={{ marginLeft: '25%' }}>Welcome {localStorage.getItem('user')} to your dashboard</h3>
                    <br />
                    <Button variant="contained" color="secondary" onClick={this.getStats}>Get Stats</Button>

                </div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8 card'>
                            <p id='loading' style={{ display: "none", textAlign: 'center' }}>loading</p>
                            <form noValidate autoComplete="off"> {itemsToRender}</form>
                        </div>
                        <div className="col-lg-1"></div>
                        <div className='col-lg-3 card' style={{
                            justifyContent: "center",
                            alignItems: "center",
                            height: 200 + 'px'
                        }}>
                            <form noValidate autoComplete="off" >
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Reason</InputLabel>
                                    <Input id="my-input" aria-describedby="my-helper-text1" onChange={this.Change} value={this.state.reason} name="reason" />
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