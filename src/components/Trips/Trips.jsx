import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#f1f2ef' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  opacity: 0.9
}));
  return (
    <div className="trips">
      <box className='bx'>
        <h1>Past Trips</h1>
      </box>
        
      
        <Box sx={{ width: '100%' }}>
        <Stack spacing={1} >
          {trips.map((trip) => {
            const formattedDate = new Date(trip.entry_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
            return (
              <div key={trip.id} className="list">
                <Item onClick={() => handleClick(trip.id)}>
                  <p> {trip.entry_point}</p>
                  <p>{formattedDate}</p>                  
                </Item>
              </div>
            );
          })}
        </Stack>
      </Box>
     
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