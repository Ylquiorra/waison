import React from 'react';

const Sort = ({ changeSort, onSelectSort, setOpenSort, openSort }) => {
  const sortRef = React.useRef();

  const sortList = [
    { name: 'Умолчанию', sortProperty: 'default' },
    { name: 'Популярности', sortProperty: 'rating' },
    { name: 'Названию', sortProperty: 'title' },
    { name: 'Цене: сначала дешевые', sortProperty: 'price' },
    { name: 'Цене: сначала дорогие', sortProperty: '-price' },
  ];
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.path.includes(sortRef.current)) {
        setOpenSort(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div ref={sortRef} className="filter-product__body">
        <div onClick={() => setOpenSort(!openSort)} className="filter-product__sort">
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
