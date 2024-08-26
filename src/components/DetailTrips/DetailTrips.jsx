import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';



function DetailTrips({tripid}) {
  const user = useSelector((store) => store.user);
  const trips = useSelector((store) => store.trips)
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
  // }, [dispatch, id]);

  // console.log('trips from store:', trips)

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

<img url="https://www.bwca.com/index.cfm?fuseaction=maps.entrydetail&olon=-92.3220&olat=47.9144&nlon=-92.3220&nlat=47.9144&zoom=14&size=500&locid=1&ft=e&locname=Trout%20Lake&maptype=2"/>

      <h2>Detailed Trip</h2>
      {details.map((detail) => {
        return (
          <div key={detail.id}>
            <p>{detail.entry_point}</p>
            <p>{detail.entry_date}</p>
            <p>{detail.longitude}</p>
            <p>{detail.latitude}</p>

          </div>
        )
      })} 

      <h5>End of DetailTrips</h5>
    </div>
  );
}

export default DetailTrips;