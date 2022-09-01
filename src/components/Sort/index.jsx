import React from 'react';

const Sort = ({ openSort, setOpenSort, sortRef, onChangeSort, onSelectSort }) => {
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
        {/* <div className="filter-product__filter">
          <b>Фильтр</b>
        </div> */}
        <div onClick={() => setOpenSort(!openSort)} className="filter-product__sort">
          <b>
            Сортировка по
            <span>{onChangeSort.name.toLowerCase()}</span>
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
                className={onChangeSort.sortProperty === sort.sortProperty ? 'list-active' : ''}>
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
