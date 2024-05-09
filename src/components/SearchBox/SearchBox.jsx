import { useId } from 'react'
import style from './SearchBox.module.css'


const SearchBox = ({ value, onChange }) => {
  const id = useId();
  return (
    <div className={style.container}> <label htmlFor={id}>Find contacts by name</label>
    <input className={style.input} id ={id}
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    /></div>
   
  );
}

export default SearchBox;