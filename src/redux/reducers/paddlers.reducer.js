const tripsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PADDLERS':
      return action.payload;   
    default:
      return state;
  }
};

export default tripsReducer;
