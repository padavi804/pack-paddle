import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchMeal(action) {
  console.log("fetching meal, due to action:", action);

  try {
    const mealResponse = yield axios.get('/api/meal');
    console.log('mealResponse:', mealResponse);


    yield put({ type: 'SET_MEAL', payload: mealResponse.data });
    } catch (error) {
    console.log('meal get request failed', error);
  }
}

function* mealSaga() {
  yield takeLatest('FETCH_MEAL', fetchMeal);
}

export default mealSaga;