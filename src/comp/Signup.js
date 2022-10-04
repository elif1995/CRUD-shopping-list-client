import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext.js';
import {message, success} from 'antd'

import Axios from 'axios';


const Signup = ({setNeedSignup, userFromData}) => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState(' ')
  const {currentUser} = useContext(UserContext)

  const success = () => {
    message.success('you are now signin');
  };

  const errorInEmail = () => {
    message.error('email is already in use');
  };
  const errorInUser = () => {
    message.error('user name is already in use');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  }

  const addToUsers = () => {
    const emailFinder = [];
    const userFinder = [];

    userFromData.forEach((user) => {
      if (user.email === email){
        emailFinder.push(user)
      }
    })
    userFromData.forEach((user) => {
      if (user.userName === userName){
        userFinder.push(user)
      }
    })

    
    
    if(email !== emailFinder[0].email || userName !== userFinder[0].userName)
    {
      Axios.post('https://shopping-list-frenkin.herokuapp.com/signup', {email: email, password: password, userName: userName})
      success()
      window.location.reload()
    }else{
      console.log("email or user is already in use");
      errorInUser()
    }
    
    
  }

  return(
    <form className="login" onSubmit={handleSubmit}>
      <h1 style={{color: 'green', fontWeight:'bold'}}> Signup </h1>
      <p>sign up and start enjoining our app</p>

      <lable>Email:</lable>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>
     
      <lable>User Name:</lable>
      <input type="name" value={userName} name="userName" onChange={(e) => setUserName(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    
      
      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToUsers}>Signup</button>
      </form>
  )
}

export default Signup