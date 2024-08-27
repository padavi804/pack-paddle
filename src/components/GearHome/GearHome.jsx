import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import GearList from '../GearList/GearList';



function GearHome() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
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
      <h2>Greetings, {user.username}!</h2>
      
        <h2>Add Gear</h2>
       
        <form>
        <input placeholder="Item" onChange={(event) => setItem(event.target.value)} value={item}></input>
        <br />
        <input placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)} value={quantity}></input>      
        <br />
        <p>Need to buy</p>
        <input type="checkbox" placeholder="Buy" onChange={(event) => setBuy(event.target.checked)} checked={buy} value={buy}></input>      
        <br />
        {/* <input placeholder="Paddler" onChange={(event) => setPaddlerid(event.target.value)}></input>       */}
        <select name='entrypoint' id='entrypoint' 
        onChange={(evt) => setPaddlerid(evt.target.value)}
        value={paddlerid}>
          <option value={0}>Who is responsible for this?</option>
          {paddlers.map((paddler) => (
            <option key={paddler.id}
              value={paddler.id}>
              {paddler.first_name}. {paddler.last_name}
            </option>
          ))}
        </select>
        <br />
      <div className='toPaddlers'>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >Add to Pack
        </button>        
      </div> 
      </form>

<GearList tripid = {id} gearUpdate={gearUpdate}/>
      <button
          type="button"
          onClick= {(e) => history.push(`/dashboard/${id}`)}

        >Return to Dashboard
        </button>  
    </div>
   
  );
}

export default GearHome;