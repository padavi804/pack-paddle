import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';
import DetailTrips from '../DetailTrips/DetailTrips';



function Dashboard() {
  const user = useSelector((store) => store.user);
  const trips = useSelector((store) => store.trips)
  const detail = useSelector((store) => store.detail)
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'FETCH_TRIPS' });
  // }, [dispatch]);

  const getTrip = () => {
    axios({
      method: 'GET',
      url: `api/trips/detail/${id}`
    })
      .then((response) => {
        console.log('detail data', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(getTrip, []);

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      <h2>Dashboard</h2>
{details.map((detail) => {
  return (
    <div key={detail.id}>
      <p>{detail.entry_point}</p>
      <p>{detail.entry_date}</p>
    </div>
  )
})} 
        {/* <DetailTrips /> */}
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