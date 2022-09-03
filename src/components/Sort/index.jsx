import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppContext from '../../context';

import { setOpenSort } from '../../redux/clickOutside/slice';

const Sort = ({ changeSort, onSelectSort }) => {
  const dispatch = useDispatch();
  const { openSort } = useSelector((state) => state.clickOutsideSlice);
  const { sortRef } = React.useContext(AppContext);

  const sortList = [
    { name: 'Умолчанию', sortProperty: 'default' },
    { name: 'Популярности', sortProperty: 'rating' },
    { name: 'Названию', sortProperty: 'title' },
    { name: 'Цене: сначала дешевые', sortProperty: 'price' },
    { name: 'Цене: сначала дорогие', sortProperty: '-price' },
  ];

  return (
    <>
      <div ref={sortRef} className="filter-product__body">
        <div onClick={() => dispatch(setOpenSort(!openSort))} className="filter-product__sort">
          <b>
            Сортировка по
            <span>{changeSort.name.toLowerCase()}</span>
          </b>
        </div>
        <div
          className={`${
            openSort
              ? 'filter-product__dropdown-menu dropdown-menu dropdown-menu-open'
              : 'filter-product__dropdown-menu dropdown-menu'
          }`}>
          <ul className="dropdown-menu__list">
            {sortList.map((sort, index) => (
              <li
                key={index}
                onClick={() => onSelectSort(sort)}
                className={changeSort.sortProperty === sort.sortProperty ? 'list-active' : ''}>
                {sort.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sort;
