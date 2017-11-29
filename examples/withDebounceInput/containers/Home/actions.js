import request from '../../utils/request';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAIL,
  RESET_SEARCH
} from './constants';
export function fetchData(keyword) {
  const url = `https://hn.algolia.com/api/v1/search?query=${keyword}`;
  return {
    types: [FETCH_DATA, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL],
    promise: () => request(url)
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH
  };
}
