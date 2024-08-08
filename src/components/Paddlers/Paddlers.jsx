import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function Paddlers() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // useEffect(() => {
  //   fetchPaddlers();
  // }, []);

  // Create router for paddlers

  // const fetchPaddlers = () => {
  //   axios.get('/api/paddlers').then((response) => {
  //     setEntryPoint(response.data);
  //   }).catch((error) => {
  //     console.log(error);
  //     alert('Something went wrong getting the entry points.');
  //   });
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('comment submitted');

  //   axios({
  //     method: 'POST',
  //     url: '/api/paddlers',
  //     data: {
  //       first_name: ,
  //       entryDate: newEntryDate
  //     }
  //   })
  //     .then((response) => {
  //       console.log('successful post', response);
  //       fetchEntryPoint();
  //       setNewEntryPoint('');
  //       setNewEntryDate('');
  //     })
  //     .catch((error) => {
  //       console.log('post failed', error)
  //     })
  //   history.push('/paddlers');
  // }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      
        <h2>New Trip Details</h2>
        <label htmlFor="entrypoint">Add Paddlers</label>
        <br />
        <form>
        <input placeholder="First Name"></input>
        <br />
        <input placeholder="Last Name"></input>      
      <br />
      <div className='toPaddlers'>
        <button
          type="button"
          // onClick={(e) => handleSubmit(e)}
        >Start Packing
        </button>        
      </div> 
      </form>
    </div>
   
  );
}

export default Paddlers;