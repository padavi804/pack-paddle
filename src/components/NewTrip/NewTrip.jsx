import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

  

function NewTrip() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState ([]);

  useEffect(() => {
    fetchEntryPoint();
  }, []);
  
  const fetchEntryPoint = () => {
    axios.get('/api/newtrip').then((response) => {
      setEntryPoint(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong getting the entry points.');
    });
  }

  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className="past trips">
        <h2>New Trip Details</h2>
        <label for="entrypoint">Choose Entry Point</label>
        <br/>
        {entryPoint.map(trips => {
          return <div className="list" key={trips.id}>
            <p>{trips.entry_point}</p>
            <select name='entrypoint' id='entrypoint'>
        <option value= 'Trout Lake'>Trout Lake</option>
        <option value= 'Crab Lake'>Crab Lake</option>
        </select>
            </div>
        })}
        
        <br/>
        <input placeholder='Entry Date'></input>

      </div>
      <br/>
      <div className='toDashboard'>
      <button
          type="button"
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          Start Packing
        </button>
      </div>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default NewTrip;