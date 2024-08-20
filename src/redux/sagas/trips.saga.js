import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchTrips(action) {
  console.log("fetching past trips, due to action:", action.payload);

  try {
    const tripsResponse = yield axios.get(`/api/trips/${action.payload}`);
    console.log('serverResponse:', tripsResponse);
    console.log('action payload:', action.payload);


    yield put({ type: 'SET_TRIPS', payload: tripsResponse.data });
    } catch (error) {
    console.log('Trips get request failed', error);
  }
}

function* setDetail(action) {
  console.log('action payload set details', action.payload)
  try{
    const detailResponse = yield axios.get(`/api/trips/detail/${action.payload}`);
    console.log('detail:', detailResponse);

    yield put ({
      type:'SET_DETAIL',
      payload: detailResponse.data,
    });
    } catch (error) {
      console.log('fecthDetails error:', error);
    }
}

function* tripsSaga() {
  yield takeLatest('FETCH_TRIPS', fetchTrips);
  yield takeLatest('SET_DETAIL', setDetail);
}

export default tripsSaga;


