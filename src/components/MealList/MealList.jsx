import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  let [mealArray, setMealArray] = useState([]);

  const fetchMeal = () => {
    axios({
      method: 'GET',
      url: 'api/meal'
    })
      .then((response) => {
        console.log(response.data);
        setMealArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(fetchMeal, []); 

  const toggleBuy = (id) => {
    console.log('toggling buy/bought status', id);

    axios({
      method: 'PUT',
      url: `/api/meal/buy/${id}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchMeal();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

 const deleteItem = (id) => {
    axios({
      method: 'DELETE',
      url: `/api/meal/${id}`
    })
      .then((response) => {
        console.log('delete item worked', response)
        fetchMeal();
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      
        
        <h2>Meal List</h2>
      <table>
        <tbody>
          {mealArray.map((meal) => {
            return (
              <tr key={meal.id}
              //  className={meal.buy ? 'true' : 'false'}
               >
                <td>{meal.item} {meal.quantity} {meal.buy} {meal.paddlerid}</td>
                {/* <td><button className="buyButton" onClick={() => toggleBuy(meal.id)}> Mark Complete </button> </td> */}
                <td><button className="deleteButton" onClick={() => deleteItem(meal.id)}>Remove</button></td>
                </tr>);
          })
          }
        </tbody>
      </table>
    </div>
   
  );
}

export default Dashboard;