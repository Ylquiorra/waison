import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Sort from '../components/Sort';

import { setCategoryId, setCurrentPage, setChangeSort } from '../redux/filter/slice';
import { setOpenSort } from '../redux/clickOutside/slice';
import { fetchProductById } from '../redux/product/asyncActions';

import '../scss/style.scss';
import Card from '../components/Card';
import Skeleton from '../components/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, currentPage, changeSort, changeSearchValue } = useSelector(
    (state) => state.filterSlice,
  );
  const { product, status } = useSelector((state) => state.productSlice);

  const fetchProduct = async () => {
    const fetchCategory =
      categoryId > 0 && changeSearchValue.length == 0 ? `category=${categoryId}` : '';
    const fetchOrder = changeSort.sortProperty.includes('-') ? 'desc' : 'asc';
    const fetchSortBy = changeSort.sortProperty.replace('-', '');
    const fetchSearch = changeSearchValue ? `&search=${changeSearchValue}` : '';
    const fetchPage = `page=${currentPage}&limit=3&`;

    dispatch(
      fetchProductById({
        fetchCategory,
        fetchOrder,
        fetchSortBy,
        fetchSearch,
        fetchPage,
      }),
    );
  };

  React.useEffect(() => {
    fetchProduct();
  }, [categoryId, currentPage, changeSort, changeSearchValue]);

  const onChangePage = (numberPage) => {
    dispatch(setCurrentPage(numberPage));
  };
  const onChangeCategoryId = (id) => {
    dispatch(setCategoryId(id));
  };
  const onSelectSort = (obj) => {
    dispatch(setChangeSort(obj));
    dispatch(setOpenSort(false));
  };

  const productItemsLessCode = product.map((objProduct) => (
    <Card {...objProduct} key={objProduct.id} image={objProduct.imageUrl} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <main className="product">
        <div className="product__container">
          <div className="product__filter">
            <div className="filter-product__row">
              <Categories categoryId={categoryId} onChangeCategoryId={onChangeCategoryId} />
              <Sort changeSort={changeSort} onSelectSort={onSelectSort} />
            </div>
          </div>
          <div className="body-product__grid">
            <div className="body-product__grid-items">
              {status === 'loading' ? skeleton : productItemsLessCode}
            </div>
          </div>
          <Pagination onChangePage={onChangePage} />
        </div>
      </main>
    </>
  );
};

export default Home;
