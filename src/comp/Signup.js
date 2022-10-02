import {useState, useEffect} from 'react';
import Axios from 'axios';


const Signup = ({setNeedSignup}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password)
  }

  const addToUsers = () => {
    Axios.post('https://shopping-list-frenkin.herokuapp.com/signup', {email: email, password: password})
    
    window.location.reload()
  }

  return(
    <form className="login" onSubmit={handleSubmit}>
      <h1 style={{color: 'green', fontWeight:'bold'}}> Signup </h1>
      <p>sign up and start enjoining our app</p>

      <lable>Email:</lable>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    
      
      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToUsers}>Signup</button>
      </form>
  )
}

export default Signup