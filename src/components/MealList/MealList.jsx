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
import './MealList.css';


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
            <TableCell align="right">Meal</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
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
                    onChange={() => toggleBuy(tripid, meal.id)}
                  />
            </TableCell>
            <TableCell align="right">{meal.meal}</TableCell>
            <TableCell align="right"><button className="deleteButton" onClick={() => deleteMeal(tripid, meal.id)}>X</button></TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>



      {/* <table>
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
      </table> */}
    </div>

  );
}

export default MealList;