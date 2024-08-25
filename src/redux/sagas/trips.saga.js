import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


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

function* fetchDetail(action) {
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
  yield takeEvery('FETCH_TRIPS', fetchTrips);
  yield takeEvery('FETCH_DETAIL', fetchDetail);
}

export default tripsSaga;


