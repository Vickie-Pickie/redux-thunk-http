import {
  CLEAR_FORM_FIELDS,
  CHANGE_FORM_FIELD,
  SET_FORM_FIELDS,
  SET_FORM_LOADING,
  SET_FORM_ERROR
} from "../actions/actionTypes";

const initialState = {
  form: {
    id: 0,
    name: '',
    price: '',
  },
  loading: false,
  error: null,
};

function serviceAddReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM_FIELD: {
      const { name, value } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        }
      };
    }
    case CLEAR_FORM_FIELDS: {
      return initialState;
    }
    case SET_FORM_FIELDS: {
      const { id, name, price } = action.payload;
      return {
        ...state,
        form: { id, name, price },
      }
    }
    case SET_FORM_LOADING: {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      }
    }
    case SET_FORM_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    }
    default:
      return state;
  }
}

export default serviceAddReducer;
