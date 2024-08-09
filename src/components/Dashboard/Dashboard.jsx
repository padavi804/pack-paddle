import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function Dashboard() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const [entryPoint, setEntryPoint] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // useEffect(() => {
  //   fetchPaddlers();
  // }, []);

 
  //   history.push('/paddlers');
  // }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>
      
        <h2>Gear List</h2>
        <label htmlFor="entrypoint">Add Paddlers</label>
        <br />
        <form>
        <input placeholder="First Name"></input>
        <br />
        <input placeholder="Last Name"></input>      
      <br />
      <div className='toGear'>
        <button
          type="button"
          // onClick={(e) => history.push('/gear')}
        >Add to List
        </button>        
      </div> 
      </form>
    </div>
   
  );
}

export default Dashboard;