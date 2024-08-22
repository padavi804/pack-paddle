import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function GearList({tripid}) {
  const gears = useSelector((store) => store.gear);
  const dispatch = useDispatch();
  const { id } = useParams();
  let [gearArray, setGearArray] = useState([]);

  // const fetchGear = (id) => {
  //   axios.get(`/api/gearlist/${id}`)
  //     .then((response) => {
  //       console.log('Fetched gear data',response.data);
  //       setGearArray(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error fetching list', error);
  //     });
  // }
  // useEffect(() => fetchGear(id), [id, gearUpdate]); 

// Redux Saga Fetch
useEffect(() => {
  dispatch({ type: 'FETCH_GEAR', payload: id });
}, []);

// Redux Saga Update

const toggleBuy = ( tripid, gearId ) => {
  console.log('Toggling buy/bought status for meal:', tripid, gearId);

    dispatch({ 
    type: 'UPDATE_GEAR', 
    payload: { 
      tripid: tripid,      
      gearId: gearId 
    } 
  });
};



  // const toggleBuy = (gearid) => {
  //   console.log('toggling buy/bought status', gearid);

  //   axios({
  //     method: 'PUT',
  //     url: `/api/gearlist/buy/${gearid}`
  //   })
  //     .then((response) => {
  //       console.log('buy toggle successful', response);
  //       fetchGear(id);
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

//  const deleteItem = (deleteid) => {
//     axios({
//       method: 'DELETE',
//       url: `/api/gearlist/${deleteid}`
//     })
//       .then((response) => {
//         console.log('delete item worked', response)
//         fetchGear(id);
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//   }

  return (
    <div className="container">
    
        <h2>Gear List</h2>
      <table>
        <tbody>
          {gears.map((gear) => {
            return (
              <tr key={gear.id}>
                <td>{gear.item}</td>
                <td>{gear.quantity}</td>
                <td>{gear.buy}</td>
                <td>{gear.first_name}</td>
                <td>
                <input
                  type="checkbox"
                  className="buyCheckbox"
                  checked={gear.buy}
                  onChange={() => toggleBuy(tripid, gear.id)}                  
                />
              </td>
                {/* <td><button className="buyButton" onClick={() => toggleBuy(gear.id)}> Buy </button> </td> */}
                {/* <td><button className="deleteButton" onClick={() => deleteItem(gear.id)}>Remove</button></td> */}
                </tr>);
          })
          }
        </tbody>
      </table>
    </div>
   
  );
}

export default GearList;