import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Redux Saga Fetch
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

// Redux Saga Update
function* updateMeal(action) {
  console.log('updating meal list', action);

  try {
    const { tripid, mealId } = action.payload;
    const mealResponse = yield axios({method: 'PUT', url:`/api/meallist/buy/${mealId}`, data: { tripid }});
    console.log('update/put meal response', mealResponse);

    yield put({type: 'FETCH_MEAL' , payload: tripid });
  }
  catch(error) {
    console.log('Error updating meal to the server')
  }
}

// Redux Saga Remove
function* deleteMeal(action) {
  console.log('deleting meal list item', action);

  try {
    const { tripid, mealId } = action.payload;
    const mealResponse = yield axios({method: 'DELETE', url:`/api/meallist/${mealId}`, data: { tripid }});
    console.log('update/put meal response', mealResponse);

    yield put({type: 'FETCH_MEAL' , payload: tripid });
  }
  catch(error){
    console.log('Error deleting meal item from the server');
  }
}

function* mealSaga() {
  yield takeEvery('FETCH_MEAL', fetchMeal);
  yield takeEvery('UPDATE_MEAL', updateMeal);
  yield takeEvery('DELETE_MEAL', deleteMeal);
}

export default mealSaga;