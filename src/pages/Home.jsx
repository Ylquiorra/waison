import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setChangeSort } from '../redux/filter/slice';
import { fetchProductById } from '../redux/product/asyncActions';
import AppContext from '../context';

import '../scss/style.scss';
import Sort from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, currentPage, changeSort, changeSearchValue } = useSelector(
    (state) => state.filterSlice,
  );
  const { product, status } = useSelector((state) => state.productSlice);
  const { openProductModal } = React.useContext(AppContext);

  const [openSort, setOpenSort] = React.useState(false);
  const [productInModal, setProductInModal] = React.useState({
    id: '',
    title: '',
    price: '',
    image: '',
    sale: '',
    categoryName: [],
    category: [],
    rating: '',
    text: '',
  });

  const fetchProduct = async () => {
    const fetchCategory =
      categoryId > 0 && changeSearchValue.length == 0 ? `category=${categoryId}` : '';
    const fetchOrder = changeSort.sortProperty.includes('-') ? 'desc' : 'asc';
    const fetchSortBy = changeSort.sortProperty.replace('-', '');
    const fetchSearch = changeSearchValue ? `&search=${changeSearchValue}` : '';
    const fetchPage = `page=${currentPage}&limit=6&`;
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
    setOpenSort(false);
  };

  const productItemsLessCode = product.map((objProduct) => (
    <ProductItem {...objProduct} key={objProduct.id} setProductInModal={setProductInModal} />
  ));
  const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <main className="product">
        <div className="product__container">
          <div className="product__filter">
            <div className="filter-product__row">
              <Categories categoryId={categoryId} onChangeCategoryId={onChangeCategoryId} />
              <Sort
                changeSort={changeSort}
                onSelectSort={onSelectSort}
                setOpenSort={setOpenSort}
                openSort={openSort}
              />
            </div>
          </div>
          <div className="body-product__grid">
            {openProductModal && <ProductModal {...productInModal} />}
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
