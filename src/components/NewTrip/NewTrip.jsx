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
  const [entryPoints, setEntryPoints] = useState([]);
  // const [newEntryPoint, setNewEntryPoint] = useState('');
  const [newEntryDate, setNewEntryDate] = useState('');
  const [entryPointId, setEntryPointId] = useState(0);


  useEffect(() => {
    fetchEntryPoint();
  }, []);

  const fetchEntryPoint = () => {
    axios.get('/api/newtrip').then((response) => {
      console.log(response.data)
      setEntryPoints(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong getting the entry points.');
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    console.log(entryPointId)
    axios({
      method: 'POST',
      url: '/api/newtrip',
      data: {
        entryid: entryPointId,
        // entry_point: newEntryPoint,
        entry_date: newEntryDate
      }
    })
      .then((response) => {
        console.log('successful post', response);
        fetchEntryPoint();
        setEntryPointId(0);
        setNewEntryDate('');
      })
      .catch((error) => {
        console.log('post failed', error)
      })
    // history.push('/paddlers');
  }

  // const callSetters = (id, value) => {
  //   setEntryPointId(id);
  //   setNewEntryPoint(value);
  // // onChange={(evt) => callSetters(entryPoint.id, evt.target.value)
  // }
  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>

      <h2>New Trip Details</h2>
      <label htmlFor="entrypoint">Choose Entry Point</label>
      <br />
      <form>
        <select name='entrypoint' id='entrypoint' 
        onChange={(evt) => setEntryPointId(evt.target.value)}
        // onChange={(evt) => callSetters(entryPointId, evt.target.value)}
        value={entryPointId}>
          <option value={0}>Select an entry point</option>
          {entryPoints.map((entryPoint) => (
            <option key={entryPoint.id}
              value={entryPoint.id}>
              {entryPoint.entry_number}. {entryPoint.entry_point} {entryPoint.id}
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

  );
}

export default NewTrip;