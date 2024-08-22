import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Trips.css';

function Trips() {
  const user = useSelector((store) => store.user);
  const detail = useSelector((store) => store.detail);
  const trips = useSelector((store) => store.trips)
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_TRIPS', payload: user.id});
  }, []);



const handleClick = (id) => {
  console.log(id)
  history.push(`/dashboard/${id}`);
};


  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      
        <h2>Past Trips</h2>
        {trips.map((trip) => {
          const formattedDate = new Date(trip.entry_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          return (
          
          <div className="list" key={trip.id} >
            <p>{trip.id}. {trip.entry_point}</p>
            <p>{formattedDate}</p>
            <p></p> 
            <button
            onClick={() => handleClick(trip.id)}
            >Visit Trip </button>          
            </div>
        )})}
     
      <br/>
      <div className='newTrip'>
      <button       
          type="button"
          className="btn"
          onClick={() => {
            history.push('/newtrip');
          }}
        >
          New Trip
        </button>
      </div>
    </div>
  );
}

export default Trips;