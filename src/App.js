import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from './context/UserContext.js';

import Axios from 'axios';
import './App.css';
import { DeleteOutlined, EditOutlined , PlayCircleOutlined, PlusCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import { Button, Space, Card, Avatar } from 'antd';
import Signup from './comp/Signup.js';
import Login from './comp/Login.js';

function App() {
  const lastFood = useRef(null);
  const [addFood, setAddFood] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [numberToBuy, setNumberToBuy] = useState(0);
  const [newFoodNumber, setNewFoodNumber] = useState(0);
  const [foodList, setFoodList] = useState([])
  const [isLogged, setIsLogged] = useState(false);
  const {currentUser} = useContext(UserContext)

  useEffect(() =>{
    Axios.get('https://shopping-list-frenkin.herokuapp.com/read').then((response) => {
      setFoodList(response.data)
      
    })
    
  },[foodList])

  const addToList = () => {
    Axios.post('https://shopping-list-frenkin.herokuapp.com/insert', {foodName: foodName, numberToBuy:numberToBuy, userEmail: currentUser})
    setAddFood(!addFood);
    
  }


  const updateFood = (id) => {
    Axios.put('https://shopping-list-frenkin.herokuapp.com/update', {id: id, newFoodNumber: newFoodNumber, } );
    
  }
  const deleteFood = (id) => {
    Axios.delete(`https://shopping-list-frenkin.herokuapp.com/delete/${id}` );
    
  }

  const handleSignOut = () => {
    window.location.reload()
  }

  return (<>
    {!isLogged ? (<Login setIsLogged={setIsLogged}/>) : (<div className="App">
      
      
      <h1 className="app-title">Food List App</h1>
      <div className="user-controle-section" ><Avatar style={{ backgroundColor: 'lightgreen', verticalAlign: 'middle' }} size="large">
        {currentUser[0]}
        </Avatar> 
        <button onClick={handleSignOut}>sign out</button>
      </div>
      {!addFood ? <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={() => setAddFood(!addFood)}>Add <PlusCircleOutlined style={{color: 'green'}}/></button> : <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={() => setAddFood(!addFood)}>Cancle <CloseCircleOutlined style={{color: 'red'}}/></button>}

      {addFood && <div className="App">
      <lable>Food Name</lable>
      <input type="text" onChange={(e) => {setFoodName(e.target.value);}}/>
      <lable>How much to buy</lable>
      <input type="number" onChange={(e) => {setNumberToBuy(e.target.value);}}/>
      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToList }><PlusCircleOutlined style={{color: 'green'}} /></button></div>}
      
      <br/>
      <h1 style={{textDecoration: 'underline'}}>Food to Buy:</h1>
      <div className="app-items">
      {foodList.filter(({userEmail}) => userEmail === currentUser).map(({foodName,howMuchToBuy,_id}) => 
        (<div className="items"> 
          <p>name: <span style={{color: 'lightgreen',fontWeight: '700',  padding: '5px',marginRight: '5px'}}> {foodName} </span> 
          quantity: <span style={{color: 'lightgreen', fontWeight: '700', padding: '5px'}}>{howMuchToBuy}</span> </p>
          
          <input type="number" 
                  placeholder="Change Food Count..." 
                    
                    onChange={(e) => {setNewFoodNumber(e.target.value);}}/>
          <>
          <button style={{backgroundColor: 'lightyellow', border: '1px solid lightgrey'}} onClick={() => {updateFood(_id)}}><EditOutlined/></button>
          <button style={{backgroundColor: 'pink', border: '1px solid lightgrey'}} onClick={() => {deleteFood(_id)}}><DeleteOutlined/></button>
          </>
          <div ref={lastFood}></div>
        </div>)
      )}
      </div>
    </div>)}</>
  );
}

export default App;
