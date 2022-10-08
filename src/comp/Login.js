import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext.js';

import {message, success} from 'antd'
import Axios  from 'axios';
import './Login.css';
import Signup from './Signup.js';
import 'antd/dist/antd.css';


const Login = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('');
  const [needSignup, setNeedsSignup] = useState(false)
  const [userFromData, setUserFromData] = useState([])
  const {setCurrentUser, setIsLogged} = useContext(UserContext);

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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    

    const userFinder = userFromData.find( user =>  user.userName === userName   )    
    const passwordMachine = (userFinder.password === password)


    if( userFinder && passwordMachine ){
      
        setIsLogged(true)
        setCurrentUser(userName)
        success()
      
      }
      else{
        error()
      }
      
      
   
  }

  


  return(
  <>
    
    {!needSignup ? <form className="login" onSubmit={handleSubmit}>
      <h1 style={{color: 'green', fontWeight:'bold'}}> Welcome to Shop List </h1>
      <p>please enter your User Name and password to continue</p>
      

      
      <lable >User Name:</lable>
      <input type="name" value={userName} name="userName" onChange={(e) => setUserName(e.target.value)} required/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)} required/>    

      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} type="submit" >Login</button> 
      <br/>
      <button style={{ background:'transparent',color:'red', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={() => setNeedsSignup(true)} >I Dont Have A User</button>
      
      </form>: <Signup userFromData={userFromData} setNeedSignup={setNeedsSignup}/>}
      </>
  )
}

export default Login