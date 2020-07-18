import React, {Component} from 'react';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            returnData: [],
            isLoaded: false,
        }
        
    }

   componentDidMount(){
    var url = this.props.history
    var user= localStorage.getItem('user')
          if(!user)
          {
            url.push('/adminlogin');
            return;
          }
   }

   logOut=(e)=>{
    var url = this.props.history
    // var user= localStorage.getItem('user')
            localStorage.clear();
            url.push('/adminlogin');
                return;
    
   }
    handleClick=(e)=>{
        var url = this.props.history
        var user= localStorage.getItem('user')

       
        
        document.getElementById('loading').style.display="block";
          var res;        
              if(!user)
              {
                url.push('/adminlogin');
                return;
              }
       firebase.database().ref(user).on("value", function (snapshot) {
        res = snapshot.val();
      })
      setTimeout(() => {
        document.getElementById('loading').style.display="none";
        this.setState({returnData:res,
            isLoaded:true})
      }, 3000) 
      
    
   }
 


render(){
    var home=this.state.returnData; 

  let itemsToRender;
  if (home) {
    itemsToRender = home.map(item => {
      return <div>{item.reason}</div>;
    });
  }
    return(
        <div className='container'>
            <h1>Welcome admin</h1>
            <button type="logout" name='logout' value='logout'style={{float: "right"}}  onClick={this.logOut}>Logout</button>
     <button  onClick={this.handleClick}>Get Reasons</button>
     <p id='loading' style={{display: "none"}}>loading</p>
    <div className='card' >{itemsToRender}</div>
     </div>
    );
}
}
export default Admin;