import {useState, useEffect} from 'react';
import Axios from 'axios';


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password)
  }

  const addToUsers = () => {
    Axios.post('https://shopping-list-frenkin.herokuapp.com/signup', {email: email, password: password})
    
    
  }

  return(
    <form className="login" onSubmit={handleSubmit}>
      <h3>signup</h3>

      <lable>Email:</lable>
      <input type="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)}/>

      <lable>Password:</lable>
      <input type="password" value={password} name="password" onChange={(e) => setPassword(e.target.value)}/>    
      
      <button onClick={addToUsers}>Signup</button>
      </form>
  )
}

export default Signup