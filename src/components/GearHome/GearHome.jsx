import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import GearList from '../GearList/GearList';



function GearHome() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const paddlers = useSelector((store) => store.paddlers);
  const dispatch = useDispatch();
  const history = useHistory();
  // const [paddlers, setPaddlers] = useState([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [buy, setBuy] = useState('');
  const [paddler, setPaddler] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/gear',
      data: {
        item: item,
        quantity: quantity,
        buy: buy,
        paddlerid: paddler
      }
    })
      .then((response) => {
        console.log('successful post', response);
        // fetchPaddlers();
        setItem('');
        setQuantity('');
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
      
        <h2>Add Gear</h2>
       
        <form>
        <input placeholder="Item" onChange={(event) => setItem(event.target.value)}></input>
        <br />
        <input placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)}></input>      
        <br />
        <p>Need to buy</p>
        <input type="checkbox" placeholder="Buy" onChange={(event) => setBuy(event.target.value)}></input>      
        <br />
        <input placeholder="Paddler" onChange={(event) => setPaddler(event.target.value)}></input>      
        <br />
      <div className='toPaddlers'>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >Add to Pack
        </button>        
      </div> 
      </form>

{/* Add Gear List component */}
<GearList />
      <button
          type="button"
          onClick= {(e) => history.push('/dashboard')}

        >Return to Dashboard
        </button>  
    </div>
   
  );
}

export default GearHome;