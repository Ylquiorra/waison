import React from 'react';

const Search = ({ onChangeSearchValue, changeSearchValue }) => {
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
