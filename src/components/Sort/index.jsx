import React from 'react';

const Sort = () => {
  const [openSort, setOpenSort] = React.useState(false);
  return (
    <>
      <div className="filter-product__body">
        <div className="filter-product__filter">
          <b>Фильтр</b>
        </div>
        <div onClick={() => setOpenSort(!openSort)} className="filter-product__sort">
          <b>
            Сортировка по: Умолчанию<span></span>
          </b>
        </div>
        <div
          className={`${
            openSort
              ? 'filter-product__dropdown-menu dropdown-menu dropdown-menu-open'
              : 'filter-product__dropdown-menu dropdown-menu'
          }`}>
          <ul className="dropdown-menu__list">
            <li>Умолчанию</li>
            <li>Популярности</li>
            <li>Рейтингу</li>
            <li>Новизне</li>
            <li>Цене: сначала дешевые</li>
            <li>Цене: сначала дорогие</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sort;
