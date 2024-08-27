import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';



function ShoppingList({ tripid }) {
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

  // Generate Avatar Letters
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  const filteredMeal = meals.filter(meal => meal.buy);
  const filteredGear = gears.filter(gear => gear.buy);

  return (
    <div className="container">

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 30 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Paddler</TableCell>
              <TableCell align="left">Item</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Buy</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {filteredMeal.map((meal) => (
            <TableRow
              key={meal.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Avatar className="nameDrop" sx={{ width: 12, height: 12 }} {...stringAvatar(`${meal.first_name} ${meal.last_name}`)} />
              </TableCell>
              <TableCell  align="left">
                {meal.item}
              </TableCell>
              <TableCell align="right">{meal.quantity}</TableCell>             
              <TableCell>
              <input
                    type="checkbox"
                    className="buyCheckbox"
                    checked={meal.buy}
                    onChange={() => toggleBuyMeal(tripid, meal.id)}
                  />
            </TableCell>
            </TableRow>

))}
            </TableBody>
            <TableBody>
          {filteredGear.map((gear) => (
            <TableRow
              key={gear.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
               <TableCell component="th" scope="row">
              <Avatar sx={{ width: 20, height: 20 }} {...stringAvatar(`${gear.first_name} ${gear.last_name}`)} />
              </TableCell>
              <TableCell  align="left">
                {gear.item}
              </TableCell>
              <TableCell align="right">{gear.quantity}</TableCell>
             
              <TableCell>
              <input
                    type="checkbox"
                    className="buyCheckbox"
                    checked={gear.buy}
                    onChange={() => toggleBuyGear(tripid, gear.id)}
                  />
            </TableCell>
         
            </TableRow>

          ))}
        </TableBody>
        </Table>
      </TableContainer>      
    </div>

  );
}

export default ShoppingList;