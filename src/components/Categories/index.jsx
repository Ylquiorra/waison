import React from 'react';

//! Хочу сделать актуальное отображение кол-во единиц продукта в категории, но пока тяжело
const arrCategories = [
  { name: 'Все', volue: '12' },
  { name: 'Аксессуары', volue: '1' },
  { name: 'Кухня', volue: '9' },
  { name: 'Мебель', volue: '2' },
  { name: 'Освещение', volue: '1' },
  { name: 'Для дома', volue: '7' },
  { name: 'Техника', volue: '3' },
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
