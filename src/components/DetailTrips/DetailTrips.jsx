import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { Loader } from "@googlemaps/js-api-loader"
import * as React from 'react';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';




function DetailTrips({tripid}) {
  const trips = useSelector((store) => store.trips)
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: 'FETCH_DETAIL', payload: id });
  }, [dispatch, id]);

  console.log('trips from store:', trips)


//   const getTrip = () => {
//     axios({
//       method: 'GET',
//       url: `api/trips/detail/${id}`
//     })
//       .then((response) => {
//         console.log('detail data', response.data);
//         setDetails(response.data);
//       })
//       .catch((error) => {
//         console.log('error fetching list', error);
//       });
//   }
//   useEffect(getTrip, []);

//     apiKey: "process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"

 return ( 
<div>
      // <h2>Detailed Trip</h2>
      // {trips.map((detail) => {
        return (
          <div key={detail.id}>
            <p>{detail.entry_point}</p>
            <p>{detail.entry_date}</p>
            <p>{detail.longitude}</p>
            <p>{detail.latitude}</p>

          </div>
        )
      })} 

</div>
)

}

export default DetailTrips;