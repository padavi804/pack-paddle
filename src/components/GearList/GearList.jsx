import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function GearList() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  let [todoNote, setTodoNote] = useState('');
  let [todoComplete, setTodoComplete] = useState('');
  let [todoArray, setTodoArray] = useState([]);

  let [gearArray, setGearArray] = useState([]);

  const fetchGear = () => {
    axios({
      method: 'GET',
      url: 'api/gear'
    })
      .then((response) => {
        console.log(response.data);
        setGearArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(fetchGear, []); 

  const toggleComplete = (id) => {
    console.log('completely toggling completeness', id);

    axios({
      method: 'PUT',
      url: `/api/gear/toggle/${id}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchGear();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

 const deleteItem = (id) => {
    axios({
      method: 'DELETE',
      url: `/api/gear/${id}`
    })
      .then((response) => {
        console.log('delete task worked', response)
        fetchGear();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      
        
        <h2>Gear List</h2>
      <table>
        <tbody>
          {gearArray.map((gear) => {
            return (
              <tr key={gear.id}
              //  className={gear.buy ? 'true' : 'false'}
               >
                <td>{gear.item} {gear.quantity} {gear.buy} {gear.paddlerid}</td>
                {/* <td><button className="doneButton" onClick={() => toggleComplete(gear.id)}> Mark Complete </button> </td> */}
                <td><button className="deleteButton" onClick={() => deleteItem(gear.id)}>Remove</button></td>
                </tr>);
          })
          }
        </tbody>
      </table>
    </div>
   
  );
}

export default GearList;