import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchTrips(action) {
  console.log("fetching past trips, due to action:", action);

  try {
    const tripsResponse = yield axios.get('/api/trips');
    console.log('serverResponse:', tripsResponse);


    yield put({ type: 'SET_TRIPS', payload: tripsResponse.data });
    } catch (error) {
    console.log('Trips get request failed', error);
  }
}

function* tripsSaga() {
  yield takeLatest('FETCH_TRIPS', fetchTrips);
}

export default tripsSaga;


