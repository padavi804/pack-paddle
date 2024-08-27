import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import * as React from 'react';
import './NewTrip.css'


function NewTrip() {
  const user = useSelector((store) => store.user);
  const paddlers = useSelector((store) => store.paddlers)
  const history = useHistory();
  const [entryPoints, setEntryPoints] = useState([]);
  const [newEntryDate, setNewEntryDate] = useState(null);
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

      <div className='inputs'>

      </div>

      <div className="inputs">
        <form>
          <Autocomplete
            disablePortal
            id="Entry Point"
            options={entryPoints}
            getOptionLabel={(option) => `${option.entry_number}. ${option.entry_point}`}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Entry Point" />}
            onChange={(event, value) => {
              setEntryPointId(value ? value.id : '');
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Entry Date"
                sx={{ width: 300 }}
                value={newEntryDate}
                onChange={(date) => setNewEntryDate(date)}
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <div className='toPaddlers'>
            <button
              className='btn'
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