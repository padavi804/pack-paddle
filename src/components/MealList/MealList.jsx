import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function MealList({ tripid }) {
  const meals = useSelector((store) => store.meal);
  const dispatch = useDispatch();
  const { id } = useParams();

  // Redux Saga Fetch
  useEffect(() => {
    dispatch({ type: 'FETCH_MEAL', payload: id });
  }, []);

  // Redux Saga Update
  const toggleBuy = (tripid, mealId) => {
    console.log('Toggling buy/bought status for meal:', tripid, mealId);

    dispatch({
      type: 'UPDATE_MEAL',
      payload: {
        tripid: tripid,
        mealId: mealId
      }
    });
  };

  // Redux Saga Delete
  const deleteMeal = (tripid, mealId) => {
    console.log('Deleting piece of food from list:', tripid, mealId);

    dispatch({
      type: 'DELETE_MEAL',
      payload: {
        tripid: tripid,
        mealId: mealId
      }
    });
  };

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
                <td><input type="checkbox"
                  className="buyCheckbox"
                  checked={meal.buy}
                  onChange={() => toggleBuy(tripid, meal.id)}
                /></td>
                <td><button className="deleteButton" onClick={() => deleteMeal(tripid, meal.id)}>Remove</button></td>
              </tr>);
          })
          }
        </tbody>
      </table>
    </div>

  );
}

export default MealList;