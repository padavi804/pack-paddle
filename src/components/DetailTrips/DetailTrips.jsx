import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';



function DetailTrips() {
  const user = useSelector((store) => store.user);
  const detail = useSelector((store) => store.detail)
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState([]);
  const [entryPoint, setEntryPoint] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: 'SET_DETAIL', payload: id });
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

      <h2>Detailed Trip</h2>
      {detail.map((details) => {
        return (
          <div key={details.id}>
            <p>{details.entry_point}</p>
            <p>{details.entry_date}</p>
          </div>
        )
      })}

      {/* <div className="past-trips" key={trips.id} >        */}

      {/* </div> */}

      <p>End of DetailTrips</p>
    </div>
  );
}

export default DetailTrips;