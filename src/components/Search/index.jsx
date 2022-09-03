import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppContext from '../../context';

const Search = () => {
  //! ТУТ КАКИЕ ТО ПРОБЛЕМЫ (НУЖНО)
  // const dispatch = useDispatch();
  const { changeSearchValue } = useSelector((state) => state.filterSlice);
  const { onChangeSearchValue } = React.useContext(AppContext);
  return (
    <div className="right-menu-header__search">
      <input
        onChange={onChangeSearchValue}
        value={changeSearchValue}
        className="search__input"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
