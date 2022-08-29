import React from 'react';

const arrCategories = [
  { id: 0, name: 'Все', volue: '22' },
  { id: 1, name: 'Аксессуары', volue: '3' },
  { id: 2, name: 'Кухня', volue: '4' },
  { id: 3, name: 'Мебель', volue: '5' },
  { id: 4, name: 'Освещение', volue: '6' },
  { id: 5, name: 'Для дома', volue: '7' },
  { id: 6, name: 'Техника', volue: '8' },
];
//!Сделал тупую заглушку на выбор категории

const Categories = () => {
  const [onChangeCategory, setOnchangeCategory] = React.useState();
  return (
    <ul className="filter-product__category">
      {arrCategories.map((categories, index) => (
        <li
          key={index}
          onClick={() => setOnchangeCategory(index)}
          className={onChangeCategory == index ? 'category-active' : 'category-disabled'}>
          <b>{categories.name}</b>
          <sub className="filter-product__volue">{categories.volue}</sub>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
