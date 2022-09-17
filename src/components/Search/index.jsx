import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

import { setChangeSearchValue } from '../../redux/filter/slice';

const Search = () => {
  const dispatch = useDispatch();

  const [searchValue, setSerchValue] = React.useState('');

  const timeoutUpdateValue = React.useCallback(
    debounce((str) => {
      dispatch(setChangeSearchValue(str));
    }, 400),
    [],
  );

  const onChangeSearchValue = (changeText) => {
    setSerchValue(changeText.target.value);
    timeoutUpdateValue(changeText.target.value);
  };

  return (
    <div className="right-menu-header__search">
      <input
        onChange={onChangeSearchValue}
        value={searchValue}
        className="search__input"
        type="text"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
