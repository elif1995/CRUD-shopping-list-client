import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext.js';
import {message, success} from 'antd'

import Axios from 'axios';


const Signup = ({setNeedSignup, userFromData}) => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const success = () => {
    message.success('you are now signin');
  };


 
  
  const errorInUser = () => {
    message.error('user name is already in use');
  };

  const errorInEmail = () => {
    message.error('email is already in use');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  }


  const addToUsers = () => {
    
    
    if(userFromData.find(user => user.userName === userName )){
      
        errorInUser()
      
    }
    if(userFromData.find(user => user.email === email)){
        errorInEmail()
      
    }
    else{
      Axios.post('https://shopping-list-frenkin.herokuapp.com/signup',{email: email, password: password, userName: userName})
      success()
      setNeedSignup(false);
      // window.location.reload()
    }      
        
        
    // if( userName !== emailFinder[0].userName)
    //   {
    //     Axios.post('https://shopping-list-frenkin.herokuapp.com/signup', {email: email, password: password, userName: userName})
    //     success()
    //     setNeedSignup(false);
    //     window.location.reload()
    //   }else{
    //     console.log("email or user is already in use");
    //     errorInUser()
        
    //   }
      
    
  }

  return(
    <form className="login" onSubmit={handleSubmit}>
      <h1 style={{color: 'green', fontWeight:'bold'}}> Signup </h1>
      <p>sign up and start enjoining our app</p>

      <lable>Email:</lable>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
     
      <lable>User Name:</lable>
      <input type="text" value={userName} name="userName" onChange={(e) => setUserName(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    
      
      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToUsers}>Signup</button>
      </form>
  )
}

export default Signup