import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function MealList({tripid}) {
  const user = useSelector((store) => store.user);
  const meals = useSelector((store) => store.meal);
  const dispatch = useDispatch();
  const { id } = useParams();
  let [mealArray, setMealArray] = useState([]);
  let [buy, setBuy] = useState(false)

  // const fetchMeal = (id) => {
  //   axios.get(`/api/meallist/${id}`)
  //     .then((response) => {
  //       console.log('Fetched meal data',response.data);
  //       setMealArray(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error fetching list', error);
  //     });
  // }
  // useEffect(() => fetchMeal(id), [id, mealUpdate]); 



  // Redux Saga Fetch
  useEffect(() => {
    dispatch({ type: 'FETCH_MEAL', payload: id });
  }, []);

  // Redux Saga Update

  const toggleBuy = ( tripid, mealId ) => {
    console.log('Toggling buy/bought status for meal:', tripid, mealId);

      dispatch({ 
      type: 'UPDATE_MEAL', 
      payload: { 
        tripid: tripid,      
        mealId: mealId 
      } 
    });
  };



  
  //   axios({
  //     method: 'PUT',
  //     url: `/api/meallist/buy/${mealid}`
  //   })
  //     .then((response) => {
  //       console.log('complete toggle successful', response);
  //       fetchMeal(id);
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })


  // const deleteItem = (deleteid) => {
  //   axios({
  //     method: 'DELETE',
  //     url: `/api/meallist/${deleteid}`
  //   })
  //     .then((response) => {
  //       console.log('delete item worked', response)
  //       fetchMeal(id);
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  return (
    <div className="container">

      <h2>Meal List</h2>
      <table>
        <tbody>
          {meals.map((meal) => {
            return (
              <tr key={meal.id}>
                <td>{meal.item}</td>
                <td>{meal.quantity}</td>
                <td>{meal.meal}</td>
                <td>{meal.first_name}</td>
                <td><input type="checkbox" className="buyCheckbox" checked={meal.buy} onChange={() => toggleBuy(meal.id)} /></td>
                {/* <td><button className="deleteButton" onClick={() => deleteItem(meal.id)}>Remove</button></td> */}
              </tr>);
          })
          }
        </tbody>
      </table>
    </div>

  );
}

export default MealList;