import { useState, useEffect, useRef, useContext } from 'react';
import UserContext from './context/UserContext.js';

import Axios from 'axios';
import './App.css';
import { DeleteOutlined, EditOutlined , PlayCircleOutlined, PlusCircleOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {  Card,  Input, Modal} from 'antd';
import Signup from './comp/Signup.js';
import Login from './comp/Login.js';

const App = () => {
  const lastFood = useRef(null);
  const [addFood, setAddFood] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [numberToBuy, setNumberToBuy] = useState(0);
  const [newFoodNumber, setNewFoodNumber] = useState(0);
  const [foodList, setFoodList] = useState([])
  const [isLogged, setIsLogged] = useState(false);
  const {currentUser} = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <div className="user-controle-section" ><div style={{ backgroundColor: 'lightgreen', verticalAlign: 'middle' ,borderRadius:"5px", fontWeight:'bold',fontSize:'18px', padding: '10px'}} size="large">
        {currentUser}
        </div> 
        <button onClick={handleSignOut}>sign out</button>
        {isModalOpen && <div className="adding-modal"><div className="App">
            <button onClick={handleCancel}>X</button>
          <lable style={{fontWeight:'bold'}}>Food Name</lable>
          <input type="text" onChange={(e) => {setFoodName(e.target.value);}}/>
          <lable style={{fontWeight:'bold'}}>How much to buy</lable>
          <input type="text" onChange={(e) => {setNumberToBuy(e.target.value);}}/>
          <button className="open-modal-button" style={{background:'lightgreen', boxShadow: ' 2px 2px 3px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToList }><PlusCircleOutlined style={{color: 'green'}} /></button></div></div>}
          </div>
          <br/>
       <button className="open-modal-button" style={{ boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', width:'80%',height:'45px', borderRadius: '5px',}} onClick={showModal}>Add <PlusCircleOutlined style={{color: 'green'}}/></button> 
      
      {/* {addFood && <div className="App">
      
      <lable>Food Name</lable>
      <input type="text" onChange={(e) => {setFoodName(e.target.value);}}/>
      <lable>How much to buy</lable>
      <input type="text" onChange={(e) => {setNumberToBuy(e.target.value);}}/>
      <button style={{ background:'transparent', boxShadow: ' 2px 2px 5px lightgrey', border:'none', cursor: 'pointer', padding: '10px 50px', borderRadius: '5px',}} onClick={addToList }><PlusCircleOutlined style={{color: 'green'}} /></button></div>} */}
      
      
      {/* <h1 style={{textDecoration: 'underline'}}>Food to Buy:</h1> */}
      <div className="app-items">
      {foodList.filter(({userEmail}) => userEmail === currentUser).map(({foodName,howMuchToBuy,_id}) => 
        (<div className="items-qty-container"><div className="qty">{howMuchToBuy}</div><div className="items"> 
          
          
          <p><span style={{color: 'rgb(90, 193, 90)',fontWeight: '700',  padding: '5px',marginLeft: '25px'}}> {foodName} </span> </p>
          {/* <input type="text" 
                  placeholder="Change Food Count..." 
                    
                    onChange={(e) => {setNewFoodNumber(e.target.value);}}/> */}
          <>
                <Input.Group compact >
            <Input
              style={{
                width: 'calc(55% )',
                height: '100%',
                fontSize: '15px'
              }}
              defaultValue="count"
              onChange={(e) => {setNewFoodNumber(e.target.value);}}
            />
              <button style={{backgroundColor: 'lightyellow', border: '1px solid lightgrey',width: '20%',}} onClick={() => {updateFood(_id)}}><EditOutlined/></button>
            
          </Input.Group>
          <button style={{backgroundColor: 'pink', border: '1px solid lightgrey'}} onClick={() => {deleteFood(_id)}}><DeleteOutlined/></button>
          </>
          <div ref={lastFood}></div>
        </div></div>)
      )}
      </div>
    </div>)}</>
  );
}

export default App;
