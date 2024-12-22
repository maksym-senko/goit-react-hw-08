import React from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/filters/slice";
import style from './SearchBox.module.css';


const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value)); // Оновлюємо пошуковий запит
  };
  
    return (
      <div className={style.searchContainer}>
        <input
          className={style.inputSearch}
          type="text"
          placeholder="Search by name"
          onChange={handleSearchChange}
        />
      </div>
    );
};
 

export default SearchBox;