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
      {/* <h2>Detailed Trip</h2> */}
      {trips.map((detail) => {
        return (
          <div key={detail.id}>
            
{/* <iframe width="400px" height="350px" 
src="https://www.paddleplanner.com/tools/embeddedmap.aspx?map=queticosuperiormap.aspx&linkoption=2&scalecontrol=true&static=false&viewoptions=n,ca,ci,cn,cqa,cqi,cqn,eppo,eppmo,epdm,epho,epqt,rs,of,fsh,poi,pt,ht,rpd,rd,crt,pmam,pmaz,bnd,ba&lakeinfo=true&lat={detail.latitude}&lng={detail.longitude}&zoom=10&maptype=ppterraingreen&mode=e"></iframe> */}

          </div>
        )
      })} 



</div>
)

}

export default DetailTrips;