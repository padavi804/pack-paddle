import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as React from 'react';



function ShoppingList() {
  const user = useSelector((store) => store.user);
  const { id } = useParams();
  let [shopArray, setShopArray] = useState([]);
  let [buy, setBuy] = useState('')


  const fetchShop = (id) => {
    axios.get(`/api/shoppinglist/${id}`)
      .then((response) => {
        console.log('Fetched meal data',response.data);
        setShopArray(response.data);
      })
      .catch((error) => {
        console.log('error fetching list', error);
      });
  }
  useEffect(() => fetchShop(id), [id]); 

  const toggleBuy = (buyid) => {
    console.log('toggling buy/bought status', buyid);

    axios({
      method: 'PUT',
      url: `/api/meallist/toggle/${buyid}`
    })
      .then((response) => {
        console.log('complete toggle successful', response);
        fetchShop(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const deleteItem = (deleteid) => {
    axios({
      method: 'DELETE',
      url: `/api/meallist/${deleteid}`
    })
      .then((response) => {
        console.log('delete item worked', response)
        fetchShop(id);
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="container">

      <h2>Meal List</h2>
      <table>
        <tbody>
          {shopArray.map((meal) => {
            return (
              <tr key={meal.id}
                // className={meal.buy ? 'true' : 'false'}
              >
                <td>{meal.item}</td>
                <td>{meal.quantity}</td>
                <td>{meal.meal}</td>
                <td>{meal.buy}</td>
                <td>{meal.paddlerid}</td>
                <td>
                <input
                  type="checkbox"
                  checked={meal.buy}
                  onChange={() => toggleBuy(meal.id)}
                  className="buyCheckbox"
                />
              </td>

                {/* <td><button className="buyButton" onClick={() => toggleBuy(meal.id)}> Buy </button> </td> */}
                <td><button className="deleteButton" onClick={() => deleteItem(meal.id)}>Remove</button></td>
              </tr>);
          })
          }
        </tbody>
      </table>
    </div>

  );
}

export default ShoppingList;