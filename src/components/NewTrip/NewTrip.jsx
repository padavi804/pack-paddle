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
  const [newEntryPoint, setNewEntryPoint] = useState('');
  const [newEntryDate, setNewEntryDate] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/newtrip',
      data: {
        entryPoint: newEntryPoint,
        entryDate: newEntryDate
      }
    })
      .then((response) => {
        console.log('successful post', response);
        fetchEntryPoint();
        setNewEntryPoint('');
        setNewEntryDate('');
      })
      .catch((error) => {
        console.log('post failed', error)
      })
    history.push('/dashboard');
  }

  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      
        <h2>New Trip Details</h2>
        <label htmlFor="entrypoint">Choose Entry Point</label>
        <br />
        <form>
        <select name='entrypoint' id='entrypoint'>
          <option value="">Select an entry point</option>
          {entryPoint.map((trip) => (
            <option key={trip.id} onChange={(evt) => setNewEntryPoint(evt.target.value)} value={trip.entry_point}>
              {trip.entry_point}
            </option>
          ))}
        </select>

        <br />
        <div className='dateSelection'>
          <input type='date' placeholder='Entry Date' onChange={(evt) => setNewEntryDate(evt.target.value)}></input>
        </div>

      
      <br />
      <div className='toDashboard'>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >Start Packing
        </button>        
      </div> 
      </form>
      {/* <LogOutButton className="btn" /> */}
    </div>
   
  );
}

export default NewTrip;