import {
  CLEAR_FORM_FIELDS,
  CHANGE_FORM_FIELD,
  SET_FORM_FIELDS,
  SET_FILTER,
  SET_LIST_ITEMS,
  SET_LIST_LOADING,
  SET_LIST_ERROR,
  SET_FORM_LOADING,
  SET_FORM_ERROR,
  REMOVE_ITEM,
  SET_DELETING_ITEM_ID,
} from "./actionTypes";

export function setListItems(items) {
  return {
    type: SET_LIST_ITEMS,
    payload: { items },
  }
}

export function setListLoading(loading) {
  return {
    type: SET_LIST_LOADING,
    payload: { loading },
  }
}

export function setListError(error) {
  return {
    type: SET_LIST_ERROR,
    payload: { error },
  }
}

export function removeItem(id) {
  return {
    type: REMOVE_ITEM,
    payload: { id },
  }
}

export function setDeletingId(deletingId) {
  return {
    type: SET_DELETING_ITEM_ID,
    payload: { deletingId },
  }
}

export function changeServiceField(name, value) {
  return {
    type: CHANGE_FORM_FIELD,
    payload: { name, value },
  }
}

export function cancelChangeServiceField() {
  return {
    type: CLEAR_FORM_FIELDS,
  }
}

export function setFormFields({id, name, price}) {
  return {
    type: SET_FORM_FIELDS,
    payload: { id, name, price },
  }
}

export function setFormLoading(loading) {
  return {
    type: SET_FORM_LOADING,
    payload: { loading },
  }
}

export function setFormError(error) {
  return {
    type: SET_FORM_ERROR,
    payload: { error },
  }
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    payload: { value },
  }
}

export function fetchItems(dispatch) {
  return async function() {
    dispatch(setListLoading(true));
    try {
      const response = await fetch('http://localhost:7070/api/services');
      const items = await response.json();
      dispatch(setListItems(items));
      dispatch(setListLoading(false));
    } catch(e) {
      dispatch(setListError(e.message));
    }
  }
}

export function fetchDetail(dispatch) {
  return async function(id) {
    dispatch(setListLoading(true));
    try {
      const response = await fetch(`http://localhost:7070/api/services/${id}`);
      const items = await response.json();
      dispatch(setFormFields(items));
      dispatch(setListLoading(false));
    } catch(e) {
      dispatch(setListError(e.message));
    }
  }
}

export function createOrUpdateItem(dispatch) {
  return async function(data) {
    dispatch(setFormLoading(true));
    try {
      await fetch('http://localhost:7070/api/services',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });
      dispatch(setFormLoading(false));
      dispatch(cancelChangeServiceField());
      await fetchItems(dispatch)();
    } catch(e) {
      dispatch(setFormError(e.message));
    }
  }
}

export function removeItemFromServer(dispatch) {
  return async function(id) {
    dispatch(setDeletingId(id));
    try {
      await fetch(`http://localhost:7070/api/services/${id}`, {
        method: 'DELETE',
      });
      dispatch(setDeletingId(null));
      dispatch(removeItem(id));
    } catch(e){
      console.log(e.message);
    }
  }
}
