import React from 'react';

const arrCategories = [
  { name: 'Все', volue: '22' },
  { name: 'Аксессуары', volue: '3' },
  { name: 'Кухня', volue: '4' },
  { name: 'Мебель', volue: '5' },
  { name: 'Освещение', volue: '6' },
  { name: 'Для дома', volue: '7' },
  { name: 'Техника', volue: '8' },
];

const Categories = ({ categoryId, onChangeCategoryId }) => {
  return (
    <ul className="filter-product__category">
      {arrCategories.map((categories, index) => (
        <li
          key={index}
          onClick={() => onChangeCategoryId(index)}
          className={categoryId == index ? 'category-active' : 'category-disabled'}>
          <b>{categories.name}</b>
          <sub className="filter-product__volue">{categories.volue}</sub>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
