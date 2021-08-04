import 'bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import './css/App.css';
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
            reason: '',
            list:[]
        }
    }
    Change=(e)=> {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
        });
    }
     componentDidMount(){
        var result =this;
        var list =  firebase.database().ref(this.props.match.params.extension);
        list.on('value', function (snapshot) {
            console.log(snapshot.val());
            result.setState({
                list:snapshot.val()
          })
        });
    }
    submit=(e)=> {
        e.preventDefault();
        var count = 0;
        var starCountRef = firebase.database().ref(this.props.match.params.extension).child(this.state.reason);
                starCountRef.on('value', function (snapshot) {
                    console.log(snapshot.val());
                    count= snapshot.val().count+1;
        });
        if (e.target.innerText === "submit") {
            this.setState({
                redirect: true,
            }, () => {    
                firebase.database().ref(this.props.match.params.extension).child(this.state.reason).set({
                    count:count
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
        var home = this.state.list;
        let itemsToRender=[];
        var k = Object.keys(home);
        for (let i = 0; i <= k.length-1; i++) {             
            itemsToRender.push(<option value={k[i]}>{k[i]}</option>);   
       }
        return (

            <div>
                <div className='jumbotron'><h1>{this.props.match.params.extension} </h1></div>
                <div className='container' align='center'>
                    <form className="center">
                        <div className="col-md-6 center boundary">
                            <div className="form-row">
                                <div><p>Please state reason for uninstalling {this.props.match.params.extension}</p></div>
                                <br />
                                <div className="form-group">

                                    <select value={this.state.value} onChange={this.Change} name="reason" style={{ width: 300 + 'px' }}>
                                        <option value="">choose a reason</option>
                                            {itemsToRender}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row center">
                                <div className="form-group col-md-6 center text-center">
                                    <button type="submit" onClick={this.submit} className="btn btn-primary ">submit</button>
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