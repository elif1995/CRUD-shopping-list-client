import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext.js';

import {message, success} from 'antd'
import Axios  from 'axios';
import './Login.css';
import Signup from './Signup.js';
import 'antd/dist/antd.css';


const Login = ({setIsLogged}) => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');
  const [needSignup, setNeedsSignup] = useState(false)
  const [userFromData, setUserFromData] = useState([])
  const {setCurrentUser} = useContext(UserContext)

  const error = () => {
    message.error('user or password is incorrect');
  };
  const success = () => {
    message.success('you are now logged in');
  };
  
  useEffect(() =>{
    Axios.get('https://shopping-list-frenkin.herokuapp.com/readlogin').then((response) => {
      setUserFromData(response.data)
      
    })

    
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userFinder = [];

    userFromData.forEach((user) => {
      if (user.userName === userName){
        userFinder.push(user)
      }
    })

    
    
    if(userName === userFinder[0].userName && password === userFinder[0].password)
    {
      setIsLogged(true)
      setCurrentUser(userName)
      success()
    }else{
      console.log("user name or password is incorrect");
      error()
    }
  }

  


  return(
  <>
    
    {!needSignup ? <form className="login" onSubmit={handleSubmit}>
      <h1 style={{color: 'green', fontWeight:'bold'}}> Welcome to Shop List </h1>
      <p>please enter your User Name and password to continue</p>
      

      
      <lable >User Name:</lable>
      <input type="name" value={userName} name="userName" onChange={(e) => setUserName(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    

      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} type="submit" >Login</button> 
      <br/>
      <button style={{ background:'transparent',color:'red', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={() => setNeedsSignup(true)} >I Dont Have A User</button>
      
      </form>: <Signup userFromData={userFromData} setNeedSignup={setNeedsSignup}/>}
      </>
  )
}

export default Login