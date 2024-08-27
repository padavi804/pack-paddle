import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// Redux Saga Fetch
function* fetchGear(action) {
  console.log("fetching gear list, due to action:", action.payload);

  try {
    const gearResponse = yield axios.get(`/api/gearlist/${action.payload}`);
    console.log('serverResponse:', gearResponse);
    console.log('action payload:', action.payload);


    yield put({ type: 'SET_GEAR', payload: gearResponse.data });
    } catch (error) {
    console.log('gear get request failed', error);
  }
}

// Redux Saga Create
function* sendGear(action) {
  console.log("posting gear, due to action:", action);

  try {
    const serverResponse = yield axios({ method: 'POST', url: '/api/gearlist', data: action.payload });
    console.log('serverResponse:', serverResponse);
    yield put({ type: 'FETCH_GEAR', payload: action.payload.tripid });
  } catch (error) {
    console.log("Error posting plants to the server");
  }
}

// Update Saga
function* updateGear(action) {
  console.log('updating gear list', action);

  try {
    const { tripid, gearId } = action.payload;
    const gearResponse = yield axios({method: 'PUT', url:`/api/gearlist/buy/${gearId}`, data: { tripid }});
    console.log('update/put gear response', gearResponse);

    yield put({type: 'FETCH_GEAR' , payload: tripid });
  }
  catch(error) {
    console.log('Error updating gear to the server')
  }
}

// Delete Saga
function* deleteGear(action) {
  console.log('deleting gear list item', action);

  try {
    const { tripid, gearId } = action.payload;
    const gearResponse = yield axios({method: 'DELETE', url:`/api/gearlist/${gearId}`, data: { tripid }});
    console.log('update/put gear response', gearResponse);

    yield put({type: 'FETCH_GEAR' , payload: tripid });
  }
  catch(error){
    console.log('Error deleting gear item from the server');
  }
}

function* gearSaga() {
  yield takeEvery('FETCH_GEAR', fetchGear);
  yield takeEvery('SEND_GEAR', sendGear);
  yield takeEvery('UPDATE_GEAR', updateGear);
  yield takeEvery('DELETE_GEAR', deleteGear);
}

export default gearSaga;