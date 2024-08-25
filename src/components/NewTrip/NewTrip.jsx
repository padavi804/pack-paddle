import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import axios from 'axios';
import * as React from 'react';
import './NewTrip.css'


function NewTrip() {
  const user = useSelector((store) => store.user);
  const paddlers = useSelector((store) => store.paddlers)
  const history = useHistory();
  const [entryPoints, setEntryPoints] = useState([]);
  const [newEntryDate, setNewEntryDate] = useState('');
  const [entryPointId, setEntryPointId] = useState(0);
  // const [tripid, setTripid] = useState(0);  

  const fetchEntryPoint = () => {
    axios.get('/api/newtrip').then((response) => {
      // console.log(response.data)
      setEntryPoints(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong getting the entry points.');
    });
  }

  useEffect(() => {
    fetchEntryPoint();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/newtrip',
      data: {
        userid: user.id,
        entryid: entryPointId,
        entry_date: newEntryDate
      }
    })
      .then((response) => {
        console.log('successful post', response);
        console.log('New trip ID:', response.data.id.id);
        const tripid = response.data.id.id;
        setEntryPointId(0);
        setNewEntryDate('');
        history.push(`/paddlers/${tripid}`);
      })
      .catch((error) => {
        console.log('post failed', error)
      })
  }

  return (
    <div className="container">
      <h1>New Trip Details</h1>
      <br />

      <label htmlFor="entrypoint">Choose Entry Point</label>
      <div className='inputs'>
        
      </div>

      <div className="inputs">
        <form>

        <select className='dropdown' name='entrypoint' id='entrypoint'
          onChange={(evt) => setEntryPointId(evt.target.value)}
          value={entryPointId}>
          <option value={0}>Select an entry point</option>
          {entryPoints.map((entryPoint) => (
            <option key={entryPoint.id}
              value={entryPoint.id}>
              {entryPoint.entry_number}. {entryPoint.entry_point}
            </option>
          ))}
        </select>
          <br />
          <div className='dateSelection'>
            <input type='date' placeholder='Entry Date' onChange={(evt) => setNewEntryDate(evt.target.value)}></input>
          </div>
          <br />
          <div className='toPaddlers'>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
            >Add Paddlers
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}

export default NewTrip;