import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function ShoppingList() {
  const user = useSelector((store) => store.user);
  const { id } = useParams();
  let [mealArray, setMealArray] = useState([]);
  let [gearArray, setGearArray] = useState([]);
  let [buy, setBuy] = useState('')


  const fetchMeal = (id) => {
    axios.get(`/api/meallist/${id}`)
      .then((response) => {
        console.log('Fetched meal data',response.data);
        setMealArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(() => fetchMeal(id), [id]); 

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

  const toggleMealBuy = (mealid) => {
    console.log('toggling buy/bought status', mealid);

    axios({
      method: 'PUT',
      url: `/api/meallist/toggle/${mealid}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchMeal(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const toggleGearBuy = (gearid) => {
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

const filteredMeal = mealArray.filter(meal => meal.buy = true);
const filteredGear = gearArray.filter(gear => gear.buy = true);
  return (
    <div className="container">

      <h2>Shopping List</h2>
      <table>
        <tbody>
          {filteredMeal.map((meal) => {
            return (
              <tr key={meal.id}
                // className={meal.buy ? 'true' : 'false'}
              >
                <td>{meal.item}</td>
                <td>{meal.quantity}</td>
                {/* <td>{meal.meal}</td> */}
                <td>{meal.buy}</td>
                <td>{meal.paddlerid}</td>
                <td><input type="checkbox" className="buyCheckbox" checked={meal.buy} onChange={() => toggleMealBuy(meal.id)}/></td>
                {/* <td><button className="deleteButton" onClick={() => deleteItem(meal.id)}>Remove</button></td> */}
              </tr>);
          })
          }          
          {filteredGear.map((gear) => {
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
                  onChange={() => toggleGearBuy(gear.id)}
                  className="buyCheckbox"
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

export default ShoppingList;