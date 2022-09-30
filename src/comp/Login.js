import {useState, useEffect} from 'react';
import {message, success} from 'antd'
import Axios  from 'axios';
import './Login.css';
import Signup from './Signup.js';
import 'antd/dist/antd.css';


const Login = ({setIsLogged}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [needSignup, setNeedsSignup] = useState(false)
  const [userFromData, setUserFromData] = useState([])


  const error = () => {
    message.error('email or password is incorrect');
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

    const emailFinder = [];

    userFromData.forEach((user) => {
      if (user.email === email){
        emailFinder.push(user)
      }
    })

    
    
    if(email === emailFinder[0].email && password === emailFinder[0].password)
    {
      setIsLogged(true)
      success()
    }else{
      console.log("email or password is incorrect");
      error()
    }
  }

  


  return(
  <>
    
    {!needSignup ? <form className="login" onSubmit={handleSubmit}>
      <h3>login</h3>

      <lable>Email:</lable>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    

      <button type="submit" >Login</button> 
      <br/>
      <button onClick={() => setNeedsSignup(true)} style={{color: 'red'}}>I Dont Have A User</button>
      
      </form>: <Signup/>}
      </>
  )
}

export default Login