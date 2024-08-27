import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';


import GearList from '../GearList/GearList';
import './GearHome.css'


function GearHome() {
  const user = useSelector((store) => store.user);
  // const paddlers = useSelector((store) => store.paddlers);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [paddlers, setPaddlers] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buy, setBuy] = useState(false);
  const [paddlerid, setPaddlerid] = useState('');
  const [gearUpdate, setGearUpdate] = useState(false);

  // Generate paddler list for select input

  const fetchPaddlers = (id) => {
    axios.get(`/api/paddlers/names/${id}`).then((response) => {
      console.log(response.data)
      setPaddlers(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong getting the paddlers.');
    });
  }

  useEffect(() => fetchPaddlers(id), [id]);

  // Handles sending the input information to the database

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    dispatch({ type: 'SEND_GEAR', payload: { item, quantity, buy, paddlerid, tripid: id } });
    // Clear out input fields
          setItem('');
          setQuantity('');
          setBuy(false);
          setPaddlerid('');
  }


  return (
    <div className="container">

      <h1>Add Gear</h1>
<div className='inputs'>
      <form>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Item" variant="outlined" onChange={(event) => setItem(event.target.value)} value={item} />
          <br />
          <TextField id="outlined-basic" label="Quantity" variant="outlined" onChange={(event) => setQuantity(event.target.value)} value={quantity} />
          <br />
          <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} 
          onChange={(event) => setBuy(event.target.value)} 
          value={buy}
          label="Add to Shopping List"
           />
          </FormGroup>
        </Box>



        {/* <input placeholder="Item" onChange={(event) => setItem(event.target.value)} value={item}></input>
        <br />
        <input placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)} value={quantity}></input>       */}
        {/* <br />
        <p>Need to buy</p>
        <input type="checkbox" placeholder="Buy" onChange={(event) => setBuy(event.target.value)} value={buy}></input>

        {/* <input placeholder="Paddler" onChange={(event) => setPaddlerid(event.target.value)}></input>       */}

        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={paddlers}
            getOptionLabel={(option) => `${option.first_name}. ${option.last_name}`}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Who is responsible for this?" />}
            onChange={(event, value) => {
              setPaddlerid(value ? value.id : '');
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />



        {/* <select name='paddlers' id='paddlers'
          onChange={(evt) => setPaddlerid(evt.target.value)}
          value={paddlerid}>
          <option value={0}>Who is responsible for this?</option>
          {paddlers.map((paddler) => (
            <option key={paddler.id}
              value={paddler.id}>
              {paddler.first_name}. {paddler.last_name}
            </option>
          ))}
        </select> */}
        <br />
        <div className='toPaddlers'>
          <button
          className='btn'
            type="button"
            onClick={(e) => handleSubmit(e)}
          >Add to Pack
          </button>
        </div>
      </form>
</div>

      <GearList tripid={id} gearUpdate={gearUpdate} />
      <button
      className='btn'
        type="button"
        onClick={(e) => history.push(`/dashboard/${id}`)}

      >Return to Dashboard
      </button>
    </div>

  );
}

export default GearHome;