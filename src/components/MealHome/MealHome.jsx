import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';
import MealList from '../MealList/MealList'


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

    axios({
      method: 'POST',
      url: '/api/meallist',
      data: {
        item: item,
        quantity: quantity,
        meal: meal,
        buy: buy,
        paddlerid: paddlerid
      }
    })
      .then((response) => {
        console.log('successful post', response);
        // fetchPaddlers();
        setItem('');
        setQuantity('');
        setMeal('');
        setBuy(false);
        setPaddlerid('');
        setMealUpdate(!mealUpdate);
      })
      .catch((error) => {
        console.log('meal post failed', error)
      })
  }

  return (
    <div className="container">
      <h2>Greetings, {user.username}!</h2>

      <h2>Add to Meals</h2>
      <form>
        <input placeholder="Item" onChange={(event) => setItem(event.target.value)} value={item}></input>
        <br />
        <input placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)} value={quantity} ></input>
        <br />
        <select placeholder="Meal" name="Meal" id="cars" onChange={(event) => setMeal(event.target.value)} value={meal}>
        <option value="select">Select a meal</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
        <br />
        <p>Need to buy</p>
        <input type="checkbox" placeholder="Buy" onChange={(event) => setBuy(event.target.checked)} checked={buy} value={buy}></input>
        <br />
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
          >Add
          </button>
        </div>
      </form>

{/* MealList Component Displayed */}
      <MealList tripid = {id} mealUpdate={mealUpdate}/>
      <button
        type="button"
        onClick={(e) => history.push(`/dashboard/${id}`)}
      >Return to Dashboard
      </button>
    </div>

  );
}

export default MealHome;