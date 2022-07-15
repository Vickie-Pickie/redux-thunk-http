import { useDispatch, useSelector } from "react-redux";
import {
  cancelChangeServiceField,
  changeServiceField,
  createOrUpdateItem,
} from "../actions/actionCreators";

function ServiceAdd() {
  const { form, loading, error } = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      return;
    }
    await createOrUpdateItem(dispatch)(form);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeServiceField(name, value));
  };

  const handleCancel = () => {
    dispatch(cancelChangeServiceField());
  };

  return (
    <>
      <form onSubmit={(handleSubmit)}>
      <input name="name" type="text" onChange={handleChange} value={form.name} />
      <input name="price" type="number" onChange={handleChange} value={form.price} />
      {
        !form.id
          ? <button type="submit" disabled={loading}>{loading ? 'Загрузка' : 'Добавить'}</button>
          : <>
            <button type="submit" disabled={loading}>{loading ? 'Загрузка' : 'Сохранить'}</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </>
      }
    </form>
      {
        error && <div className="error-wrapper">Произошла ошибка сохранения данных</div>
      }
    </>
  );
}

export default ServiceAdd;

