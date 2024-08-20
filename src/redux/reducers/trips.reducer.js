const tripsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRIPS':
      // console.log('action payload:', action.payload)
      return action.payload;   
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default tripsReducer;
