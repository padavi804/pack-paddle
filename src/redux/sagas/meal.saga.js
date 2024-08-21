import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


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

function* deleteMeal(action) {
  console.log('deleting meal list item', action);

  try {
    const mealResponse = yield axios.delete(`/api/meallist/${action.payload}`);
    console.log('delete meal response', mealResponse);
    yield put({type: 'FETCH_MEALS'});
  }
  catch(error){
    console.log('Error deleting meal item from the server');
  }
}

function* mealSaga() {
  yield takeEvery('FETCH_MEAL', fetchMeal);
  yield takeEvery('SET_MEAL', setMeal);
  yield takeEvery('REMOVE_MEAL', deleteMeal);
}

export default mealSaga;