import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import MealList from '../MealList/MealList'
import GearList from '../GearList/GearList';
import ShoppingList from '../ShoppingList/ShoppingList';
import './Dashboard.css';

function Dashboard() {
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  const getTrip = () => {
    axios({
      method: 'GET',
      url: `api/trips/detail/${id}`
    })
      .then((response) => {
        // console.log('detail data', response.data);
        console.log('details response', response.data);
        setDetails(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(getTrip, []);
  // console.log(id)

  return (
    <div className="container">
      <h1>Dashboard</h1>
      {details.map((detail) => {
        return (
          <div key={detail.id}>
            <p>{detail.entry_point}</p>
            <p>{detail.entry_date}</p>
          </div>
        )
      })}
      <br />
      {/* <div className='toGear'>
        <button
          type="button"
          onClick={() => history.push(`/gear/${id}`)}
        >Add to Gear List
        </button>
      </div>
      <br />
      <div className='toMeal'>
        <button
          type="button"
          onClick={() => history.push(`/meal/${id}`)}
        >Add to Meal List
        </button>
      </div> */}

      <div className='accordion'>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h3>Shopping List</h3>
            </AccordionSummary>
          <AccordionDetails>
        <ShoppingList tripid={id}/>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            >
              
            <h3>Meal List</h3>
            </AccordionSummary>
          <AccordionDetails>
          <button
          className='btn'
          type="button"
          onClick={() => history.push(`/meal/${id}`)}
        >Add to Meal List
        </button>
            <MealList tripid={id}/>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h3>Gear List</h3>
            </AccordionSummary>
          <AccordionDetails>
          <button
           className='btn'
          type="button"
          onClick={() => history.push(`/gear/${id}`)}
        >Add to Gear List
        </button>
        <GearList tripid={id}/>
          </AccordionDetails> 
        </Accordion>
      </div>
    </div>
  );
}

export default Dashboard;