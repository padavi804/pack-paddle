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


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/gearlist',
      data: {
        item: item,
        quantity: quantity,
        buy: buy,
        paddlerid: paddlerid
      }
    })
      .then((response) => {
        console.log('successful post', response);
        // fetchPaddlers();
        setItem('');
        setQuantity('');
        setBuy(false);
        setPaddlerid('');
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

<GearList tripid = {id}/>
      <button
          type="button"
          onClick= {(e) => history.push(`/dashboard/${id}`)}

        >Return to Dashboard
        </button>  
    </div>
   
  );
}

export default GearHome;