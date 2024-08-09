import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchGear(action) {
  console.log("fetching gear, due to action:", action);

  try {
    const gearResponse = yield axios.get('/api/gear');
    console.log('gearResponse:', gearResponse);


    yield put({ type: 'SET_GEAR', payload: gearResponse.data });
    } catch (error) {
    console.log('Gear get request failed', error);
  }
}

function* gearSaga() {
  yield takeLatest('FETCH_GEAR', fetchGear);
}

export default gearSaga;