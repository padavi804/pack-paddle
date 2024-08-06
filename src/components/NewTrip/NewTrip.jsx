import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


  

function NewTrip() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const history = useHistory();

  return (
    <div className="container">
      <h2>Ahoy, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div className="past trips">
        <h2>New Trip Details</h2>
        <input placeholder='Entry Point'></input>
        <br/>
        <input placeholder='Entry Date'></input>

      </div>
      <br/>
      <div className='toDashboard'>
      <button
          type="button"
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          Start Packing
        </button>
      </div>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

export default NewTrip;