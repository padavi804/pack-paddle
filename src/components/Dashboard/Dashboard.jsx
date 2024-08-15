import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';
import DetailTrips from '../DetailTrips/DetailTrips';



function Dashboard() {
  const user = useSelector((store) => store.user);
  const trips = useSelector((store) => store.trips)
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS' });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>

      <h2>Dashboard</h2>
      <div className="past-trips" key={trips.id}>       
        {/* {trips.map(trip => {
          return <div className="list" key={trip.id}>
            <p>{trip.entry_point}</p>
            <p>{trip.entry_date}</p>
            <p>{trip.id}</p>            
            </div>
        })} */}
        <DetailTrips />
      </div>

      <br />

      <div className='toGear'>
        <button
          type="button"
          onClick={() => history.push('/gear')}
        >Add to Gear List
        </button>
      </div>
      <br />
      <div className='toMeal'>
        <button
          type="button"
          onClick={() => history.push('/meal')}
        >Add to Meal List
        </button>
      </div>
      <GearList />
      <MealList />
    </div>
  );
}

export default Dashboard;