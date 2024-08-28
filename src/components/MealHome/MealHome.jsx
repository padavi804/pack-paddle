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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MealList from '../MealList/MealList';
import './MealHome.css';

function MealHome() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // const paddlers = useSelector((store) => store.paddlers);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [paddlers, setPaddlers] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [meal, setMeal] = useState('');
  const [buy, setBuy] = useState(false);
  const [paddlerid, setPaddlerid] = useState('');
  const [mealUpdate, setMealUpdate] = useState(false);

  // Generate paddler list for select input
  const fetchPaddlers = (id) => {
    axios.get(`/api/paddlers/names/${id}`).then((response) => {
      console.log("home fetch paddlers response data", response.data)
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

    dispatch({ type: 'SEND_MEAL', payload: { item, quantity, meal, buy, paddlerid, tripid: id } });
    // Clear out input fields
    setItem('');
    setQuantity('');
    setMeal('');
    setBuy(false);
    setPaddlerid(null);
  }


  return (
    <div className="container">

      <h2>Add Meals</h2>

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
            <FormControl fullWidth>
              <InputLabel id="meal">Meal</InputLabel>
              <Select
                labelId="meal"
                placeholder="meal"
                id="meal"
                label="Meal"
                onChange={(event) => setMeal(event.target.value)}
                value={meal}
              >
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>

              </Select>
            </FormControl>

            <FormGroup>
              <FormControlLabel 
                control={<Checkbox checked={buy} />}
                onChange={(event) => setBuy(event.target.checked)}
                value={buy}
                label="Add to Shopping List"
              />
            </FormGroup>
          </Box>

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={paddlers.id}
            options={paddlers}
            getOptionLabel={(option) => `${option.first_name}. ${option.last_name}`}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Who is responsible for this?" />}
            onChange={(event, value) => {
              setPaddlerid(value ? value.id : '');
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
          />


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


      {/* MealList Component Displayed */}
      <div className='mealComponent'>
        <MealList tripid={id} mealUpdate={mealUpdate} />
        <button
          className='btn'
          type="button"
          onClick={(e) => history.push(`/dashboard/${id}`)}
        >Return to Dashboard
        </button>
      </div>
    </div>

  );
}

export default MealHome;