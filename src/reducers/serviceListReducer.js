import {
  REMOVE_ITEM,
  SET_DELETING_ITEM_ID,
  SET_LIST_ERROR,
  SET_LIST_ITEMS,
  SET_LIST_LOADING,
} from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  deletingId: null,
}

function serviceListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LIST_ITEMS: {
      return { ...state, items: action.payload.items }
    }
    case SET_LIST_LOADING: {
      return { ...state, loading: action.payload.loading, error: null }
    }
    case SET_LIST_ERROR: {
      return { ...state, loading: false, error: action.payload.error }
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }
    }
    case SET_DELETING_ITEM_ID: {
      return {
        ...state,
        deletingId: action.payload.deletingId,
      }
    }
    default:
      return state;
  }
}

export default serviceListReducer;
