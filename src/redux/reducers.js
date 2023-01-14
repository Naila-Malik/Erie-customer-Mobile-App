import {Order_Redux} from './action';

const initialState = {
  orderRedux: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case Order_Redux:
      return {...state, orderRedux: action.payload};

    default:
      return state;
  }
}

export default userReducer;
