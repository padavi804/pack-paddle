import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';
import ShoppingList from '../ShoppingList/ShoppingList';


function Dashboard() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const getTrip = () => {
    axios({
      method: 'GET',
      url: `api/trips/detail/${id}`
    })
      .then((response) => {
        // console.log('detail data', response.data);
        console.log('details response', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(getTrip, []);
  // console.log(id)

  return (
    <div className="container">
      <h1>Dashboard</h1>
{details.map((detail) => {
  return (
    <div key={detail.id}>
      <p>{detail.entry_point}</p>
      <p>{detail.entry_date}</p>
    </div>
  )
})} 
      <br />
      <div className='toGear'>
        <button
          type="button"
          onClick={() => history.push(`/gear/${id}`)}
        >Add to Gear List
        </button>
      </div>
      <br />
      <div className='toMeal'>
        <button
          type="button"
          onClick={() => history.push(`/meal/${id}`)}
        >Add to Meal List
        </button>
      </div>
      <ShoppingList tripid = {id}/>
      <GearList tripid = {id}/>
      <MealList tripid = {id}/>
      <p>"A towel, it says, is about the most massively useful thing an interstellar hitchhiker can have"</p>
    </div>
  );
}

export default Dashboard;