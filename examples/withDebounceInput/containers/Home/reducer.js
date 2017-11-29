import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  RESET_SEARCH
} from './constants';

const initState = {
  fetching: false,
  data: []
};

export default function home(state = initState, action) {
  switch (action.type) {
    case FETCH_DATA: {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_DATA_SUCCESS: {
      const { hits } = action.result;
      return {
        ...state,
        fetching: false,
        data: hits
      };
    }
    case FETCH_DATA_FAIL: {
      return {
        ...state,
        fetching: false
      };
    }
    case RESET_SEARCH: {
      return {
        ...state,
        data: []
      };
    }
    default:
      return state;
  }
}
