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

  let [gearArray, setGearArray] = useState([]);
  let [buy, setBuy] = useState('')

  const fetchGear = () => {
    axios({
      method: 'GET',
      url: 'api/gearlist'
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

  const toggleBuy = (id) => {
    console.log('toggling buy/bought status', id);

    axios({
      method: 'PUT',
      url: `/api/gearlist/buy/${id}`
    })
      .then((response) => {
        console.log('buy toggle successful', response);
        fetchGear();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

 const deleteItem = (id) => {
    axios({
      method: 'DELETE',
      url: `/api/gearlist/${id}`
    })
      .then((response) => {
        console.log('delete item worked', response)
        fetchGear();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">
    
        <h2>Gear List</h2>
      <table>
        <tbody>
          {gearArray.map((gear) => {
            return (
              <tr key={gear.id}
              //  className={gear.buy ? 'true' : 'false'}
               >
                <td>{gear.item}</td>
                <td>{gear.quantity}</td>
                <td>{gear.buy}</td>
                <td>{gear.paddlerid}</td>
                <td><button className="buyButton" onClick={() => toggleBuy(gear.id)}> Buy </button> </td>
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