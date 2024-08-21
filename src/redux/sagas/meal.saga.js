import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


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

function* setMeal(action) {
  console.log('action payload set details', action.payload)
  try{
    const mealResponse = yield axios.get(`/api/meallist`);
    console.log('detail:', mealResponse);

    yield put ({
      type:'SET_MEAL',
      payload: mealResponse.data,
    });
    } catch (error) {
      console.log('fecthMeal error:', error);
    }
}

function deleteMeal(action) {
  
}

function* mealSaga() {
  yield takeLatest('FETCH_MEAL', fetchMeal);
  yield takeLatest('SET_MEAL', setMeal);
}

export default mealSaga;


