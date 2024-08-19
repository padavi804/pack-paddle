import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function GearList() {
  const user = useSelector((store) => store.user);
  const { id } = useParams();
  let [gearArray, setGearArray] = useState([]);
  let [initials, setInitials] = useState([]);

  const fetchGear = (id) => {
    axios.get(`/api/gearlist/${id}`)
      .then((response) => {
        console.log('Fetched gear data',response.data);
        setGearArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(() => fetchGear(id), [id]); 

  const fetchInitials = (id) => {
    axios.get(`/api/paddlers/initials/${id}`)
      .then((response) => {
        console.log('Fetched initials data',response.data);
        setInitials(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(() => fetchInitials(id), [id]);

  const toggleBuy = (gearid) => {
    console.log('toggling buy/bought status', gearid);

    axios({
      method: 'PUT',
      url: `/api/gearlist/buy/${gearid}`
    })
      .then((response) => {
        console.log('buy toggle successful', response);
        fetchGear(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

 const deleteItem = (deleteid) => {
    axios({
      method: 'DELETE',
      url: `/api/gearlist/${deleteid}`
    })
      .then((response) => {
        console.log('delete item worked', response)
        fetchGear(id);
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
               className={gear.buy ? 'true' : 'false'}
               >
                <td>{gear.item}</td>
                <td>{gear.quantity}</td>
                <td>{gear.buy}</td>
                <td>{gear.paddlerid}</td>

                <td>
                <input
                  type="checkbox"
                  checked={gear.buy}
                  onChange={() => toggleBuy(gear.id)}
                  className="buyCheckbox"
                />
              </td>
                {/* <td><button className="buyButton" onClick={() => toggleBuy(gear.id)}> Buy </button> </td> */}
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