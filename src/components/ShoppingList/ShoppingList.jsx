import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function ShoppingList({tripid}) {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const gears = useSelector((store) => store.gear);
  const meals = useSelector((store) => store.meal);

  // Redux Saga Fetch Gear
  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR', payload: id });
  }, []);

  // Redux Saga Update
  const toggleBuyGear = (tripid, gearId) => {
    console.log('Toggling buy/bought status for gear:', tripid, gearId);

    dispatch({
      type: 'UPDATE_GEAR',
      payload: {
        tripid: tripid,
        gearId: gearId
      }
    });
  };

  // Redux Saga Fetch Meal
  useEffect(() => {
    dispatch({ type: 'FETCH_MEAL', payload: id });
  }, []);

  // Redux Saga Update Meal
  const toggleBuyMeal = (tripid, mealId) => {
    console.log('Toggling buy/bought status for meal:', tripid, mealId);

    dispatch({
      type: 'UPDATE_MEAL',
      payload: {
        tripid: tripid,
        mealId: mealId
      }
    });
  };
  
  // const fetchMeal = (id) => {
  //   axios.get(`/api/meallist/${id}`)
  //     .then((response) => {
  //       console.log('Fetched meal data', response.data);
  //       setMealArray(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error fetching list', error);
  //     });
  // }
  // useEffect(() => fetchMeal(id), [id]);

  // const fetchGear = (id) => {
  //   axios.get(`/api/gearlist/${id}`)
  //     .then((response) => {
  //       console.log('Fetched gear data', response.data);
  //       setGearArray(response.data);
  //     })
  //     .catch((error) => {
  //       console.log('error fetching list', error);
  //     });
  // }
  // useEffect(() => fetchGear(id), [id]);

  // const toggleMealBuy = (mealid) => {
  //   console.log('toggling buy/bought status', mealid);

  //   axios({
  //     method: 'PUT',
  //     url: `/api/meallist/buy/${mealid}`
  //   })
  //     .then((response) => {
  //       console.log('complete toggle successful', response);
  //       fetchMeal(id);
  //       setUpdate(!update);
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  // const toggleGearBuy = (gearid) => {
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

  const filteredMeal = meals.filter(meal => meal.buy);
  const filteredGear = gears.filter(gear => gear.buy);

  return (
    <div className="container">

      {/* <h2>Shopping List</h2> */}
      <table>
        <tbody>
          {filteredMeal.map((meal) => {
            return (
              <tr key={meal.id}>
                <td>{meal.item}</td>
                <td>{meal.quantity}</td>
                <td>{meal.buy}</td>
                <td>{meal.first_name}</td>
                <td><input type="checkbox"
                  className="buyCheckbox"
                  checked={meal.buy}
                  onChange={() => toggleBuyMeal(tripid, meal.id)}
                /></td>
              </tr>);
          })
          }
          {filteredGear.map((gear) => {
            return (
              <tr key={gear.id}>
                <td>{gear.item}</td>
                <td>{gear.quantity}</td>
                <td>{gear.buy}</td>
                <td>{gear.first_name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={gear.buy}
                    onChange={() => toggleBuyGear(tripid, gear.id)}
                    className="buyCheckbox"
                  />
                </td>
              </tr>);
          })
          }
        </tbody>
      </table>
    </div>

  );
}

export default ShoppingList;