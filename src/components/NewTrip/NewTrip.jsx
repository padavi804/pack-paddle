import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function NewTrip() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState([]);

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
      <div className="past trips">
        <h2>New Trip Details</h2>
        <label htmlFor="entrypoint">Choose Entry Point</label>
        <br />
        <select name='entrypoint' id='entrypoint'>
          <option value="">Select an entry point</option>
          {entryPoint.map((trip) => (
            <option key={trip.id} value={trip.entry_point}>
              {trip.entry_point}
            </option>
          ))}
        </select>

        <br />
        <div className='dateSelection'>
          <input type='date' placeholder='Entry Date'></input>
        </div>

      </div>
      <br />
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