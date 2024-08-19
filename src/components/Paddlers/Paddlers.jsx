import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function Paddlers() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const [paddlers, setPaddlers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fetchPaddlers = (id) => {
    axios.get(`/api/paddlers/${id}`)
    .then((response) => {
      console.log('paddlers get response data:', response.data)
      setPaddlers(response.data);
    }).catch((error) => {
      console.log(error);
      // alert('Something went wrong getting the paddlers.');
    });
  }
  useEffect(() => {fetchPaddlers(id);}, [id]); 


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment submitted');

    axios({
      method: 'POST',
      url: '/api/paddlers',
      data: {
        first_name: firstName,
        last_name: lastName,
        tripid: id
      }
    })
      .then((response) => {
        console.log('successful post', response);
        fetchPaddlers(id);
        setFirstName('');
        setLastName('');
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
        <input placeholder="First Name" onChange={(event) => setFirstName(event.target.value)}></input>
        <br />
        <input placeholder="Last Name" onChange={(event) => setLastName(event.target.value)}></input>      
      <br />
      <div className='toPaddlers'>
        <button
          type="button"
          onClick={(e) => handleSubmit(e)}
        >Add Paddler
        </button>        
      </div> 
      </form>
<ul>
<div className="past-trips" key={paddlers.id}>
        <h2>Paddlers</h2>
        {paddlers.map(paddler => {
          return <div className="list" key={paddler.id}>
            <li>{paddler.first_name} {paddler.last_name}</li>                   
            </div>
        })}
      </div>
</ul>

      <button
          type="button"
          onClick= {(e) => history.push(`/dashboard/${id}`)}

        >Start Packing
        </button>  
    </div>
   
  );
}

export default Paddlers;