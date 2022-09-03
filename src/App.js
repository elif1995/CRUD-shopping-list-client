import { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';
import { DeleteOutlined, EditOutlined , PlayCircleOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { Button, Space } from 'antd';

function App() {

  const [addFood, setAddFood] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [numberToBuy, setNumberToBuy] = useState(0);
  const [newFoodNumber, setNewFoodNumber] = useState(0);
  const [foodList, setFoodList] = useState([])

  useEffect(() =>{
    Axios.get('https://shopping-list-frenkin.herokuapp.com/read').then((response) => {
      setFoodList(response.data)
    })
  },[foodList])

  const addToList = () => {
    Axios.post('https://shopping-list-frenkin.herokuapp.com/insert', {foodName: foodName, numberToBuy:numberToBuy})
  }


  const updateFood = (id) => {
    Axios.put('https://shopping-list-frenkin.herokuapp.com/update', {id: id, newFoodNumber: newFoodNumber, } );
    
  }
  const deleteFood = (id) => {
    Axios.delete(`https://shopping-list-frenkin.herokuapp.com/delete/${id}` );
    
  }

  return (
    <div className="App">
      <h1>Food Store App</h1>

      <button style={{ background:'transparent', boxShadow: ' 5px 5px 35px lightgrey', border:'none', cursor: 'pointer'}} onClick={() => setAddFood(!addFood)}>Add <PlusCircleOutlined style={{color: 'green'}}/></button>

      {addFood && <div className="App">
      <lable>Food Name</lable>
      <input type="text" onChange={(e) => {setFoodName(e.target.value);}}/>
      <lable>How much to buy</lable>
      <input type="number" onChange={(e) => {setNumberToBuy(e.target.value);}}/>
      <button style={{ background:'transparent', boxShadow: ' 4px 4px 15px lightgrey', border:'none', cursor: 'pointer'}} onClick={addToList}><PlusCircleOutlined style={{color: 'green'}} /></button></div>}
      
      <br/>
      <h1 style={{textDecoration: 'underline'}}>Food to Buy:</h1>
      <div className="app-items">
      {foodList.map(({foodName,howMuchToBuy,_id}) => 
        (<div className="items"> 
          <h1>buy <span style={{color: 'green', border: '1px dotted green', padding: '5px'}}>{howMuchToBuy}</span> <span style={{color: 'green', border: '1px dotted green', padding: '5px'}}>{foodName} </span></h1>
          
          <input type="text" 
                  placeholder="Enter Food Count..." 
                    onChange={(e) => {setNewFoodNumber(e.target.value);}}/>
          <button onClick={() => {updateFood(_id)}}><EditOutlined/></button>
          <button onClick={() => {deleteFood(_id)}}><DeleteOutlined/></button>
        </div>)
      )}
      </div>
    </div>
  );
}

export default App;
