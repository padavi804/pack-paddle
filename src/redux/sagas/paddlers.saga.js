import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* fetchPaddlers(action) {
  console.log("fetching paddlers, due to action:", action);

  try {
    const paddlersResponse = yield axios.get('/api/paddlers');
    console.log('paddlersResponse:', paddlersResponse);


    yield put({ type: 'SET_PADDLERS', payload: paddlersResponse.data });
    } catch (error) {
    console.log('Paddlers get request failed', error);
  }
}

function* paddlersSaga() {
  yield takeLatest('FETCH_PADDLERS', fetchPaddlers);
}

export default paddlersSaga;