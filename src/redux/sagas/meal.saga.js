import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* fetchMeal(action) {
  console.log("fetching meal list, due to action:", action.payload);

  try {
    const mealResponse = yield axios.get(`/api/meallist/${action.payload}`);
    console.log('serverResponse:', mealResponse);
    console.log('action payload:', action.payload);


    yield put({ type: 'SET_MEAL', payload: mealResponse.data });
    } catch (error) {
    console.log('Meal get request failed', error);
  }
}

// Update, Create, ==> include fetch meal saga

// function* createMeal(action) {
//   console.log('updating meal list', action);

//   try {
//     const mealResponse = axios.post(`/api/meallist`);
//     console.log('create/post meal response', mealResponse);

//     yield put({type: 'FETCH_MEAL', payload: action});
//   }
//   catch(error) {
//     console.log('Error updating meal to the server')
//   }
// }

function* updateMeal(action) {
  console.log('updating meal list', action);

  try {
    const { id, buy } = action.payload;
    const mealResponse = yield axios({method: 'PUT', url:`/api/meallist/buy/${action.payload}`, data: { id: id, buy: buy}});
    console.log('update/put meal response', mealResponse);

    yield put({type: 'FETCH_MEAL' });
  }
  catch(error) {
    console.log('Error updating meal to the server')
  }
}

function* deleteMeal(action) {
  console.log('deleting meal list item', action);

  try {
    const mealResponse = yield axios.delete(`/api/meallist/${action.payload}`);
    console.log('delete meal response', mealResponse);
    yield put({type: 'FETCH_MEAL', payload: action });  // Don't forget the payload with the tripId
  }
  catch(error){
    console.log('Error deleting meal item from the server');
  }
}

function* mealSaga() {
  yield takeEvery('FETCH_MEAL', fetchMeal);
  // yield takeEvery('CREATE_MEAL', createMeal);
  yield takeEvery('UPDATE_MEAL', updateMeal);
  yield takeEvery('REMOVE_MEAL', deleteMeal);
}

export default mealSaga;