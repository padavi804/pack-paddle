import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import trips from './trips.reducer';
import paddlers from './paddlers.reducer';
import detail from './detail.reducer';
import meal from './meal.reducer';
import gear from './gear.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  trips,
  paddlers,
  detail,
  meal,
  gear
});

export default rootReducer;
