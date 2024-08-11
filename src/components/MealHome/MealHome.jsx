import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function MealHome() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const paddlers = useSelector((store) => store.paddlers);
  const dispatch = useDispatch();
  const history = useHistory();

  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [meal, setMeal] = useState('');
  const [buy, setBuy] = useState('');
  const [paddler, setPaddler] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/meal',
      data: {
        item: item,
        quantity: quantity,
        meal: meal,
        buy: buy,
        paddler: paddler
      }
    })
      .then((response) => {
        console.log('successful post', response);
        // fetchPaddlers();
        setItem('');
        setQuantity('');
        setMeal('');
        setBuy('');
        setPaddler('');
      })
      .catch((error) => {
        console.log('post failed', error)
      })
  }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      
        <h2>New Trip Details</h2>
        <label htmlFor="entrypoint">Add Paddlers</label>
        <br />
        <form>
        <input placeholder="Item" onChange={(event) => setItem(event.target.value)}></input>
        <br />
        <input placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)}></input>      
        <br />
        <input placeholder="Meal" onChange={(event) => setMeal(event.target.value)}></input>      
        <br />
        <input placeholder="Buy" onChange={(event) => setBuy(event.target.value)}></input>      
        <br />
        <input placeholder="Paddler" onChange={(event) => setPaddler(event.target.value)}></input>      
        <br />
      <div className='toPaddlers'>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >Add Paddler
        </button>        
      </div> 
      </form>

{/* Add MealList component */}
      <button
          type="button"
          onClick= {(e) => history.push('/dashboard')}

        >Return to Dashboard
        </button>  
    </div>
   
  );
}

export default MealHome;