import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function MealList({mealUpdate}) {
  const user = useSelector((store) => store.user);
  const { id } = useParams();
  let [mealArray, setMealArray] = useState([]);


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
  useEffect(() => fetchMeal(id), [id, mealUpdate]); 

  const toggleBuy = (mealid) => {
    console.log('toggling buy/bought status', mealid);

    axios({
      method: 'PUT',
      url: `/api/meallist/buy/${mealid}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchMeal(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteItem = (deleteid) => {
    axios({
      method: 'DELETE',
      url: `/api/meallist/${deleteid}`
    })
      .then((response) => {
        console.log('delete item worked', response)
        fetchMeal(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">

      <h2>Meal List</h2>
      <table>
        <tbody>
          {mealArray.map((meal) => {
            return (
              <tr key={meal.id}
                // className={meal.buy ? 'true' : 'false'}
              >
                <td>{meal.item}</td>
                <td>{meal.quantity}</td>
                <td>{meal.meal}</td>
                <td>{meal.buy}</td>
                <td>{meal.first_name}</td>
                <td><input type="checkbox" className="buyCheckbox" checked={meal.buy} onChange={() => toggleBuy(meal.id)}/></td>
                <td><button className="deleteButton" onClick={() => deleteItem(meal.id)}>Remove</button></td>
              </tr>);
          })
          }
        </tbody>
      </table>
    </div>

  );
}

export default MealList;