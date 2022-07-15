import { useDispatch, useSelector } from "react-redux";
import {fetchDetail, fetchItems, removeItemFromServer } from "../actions/actionCreators";
import { useEffect } from "react";

function ServiceList() {
  const { items, loading, error, deletingId } = useSelector(state => state.serviceList);
  const filterValue = useSelector(state => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItems(dispatch)();
  },[dispatch]);

  const handleRemove = (id) => {
    removeItemFromServer(dispatch)(id);
  };

  const handleEdit = (id) => {
    fetchDetail(dispatch)(id);
  };

  let filteredList = items;
  if (filterValue) {
    filteredList = items.filter(item => item.name.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);
  }

  if (loading) {
    return <>Загрузка...</>
  }

  if (error) {
    return <div className="error-wrapper">Произошла ошибка</div>
  }

  return (
    <ul>
      {
        filteredList.length > 0
        ? filteredList.map(item =>  {
          return (
            <li key={item.id}>
              <div className="item">
                <div className="item_name">{item.name}</div>
                <div className="item_price">{item.price}</div>
                </div>
              <span className="material-icons edit" onClick={() => handleEdit(item.id)}>edit</span>
              {
                deletingId === item.id
                  ? <span className="material-icons">loop</span>
                  : <span className="material-icons clear" onClick={() => handleRemove(item.id)}>clear</span>
              }
            </li>
          )})
        : 'Ничего не найдено'
        }
    </ul>
  );
}

export default ServiceList;
