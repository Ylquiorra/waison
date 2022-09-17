import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';

import { setCategoryId, setCurrentPage, setChangeSort, setFilters } from '../redux/filter/slice';
import { setUser } from '../redux/user/slice';
import { fetchProductById } from '../redux/product/asyncActions';
import AppContext from '../context';

import '../scss/style.scss';
import Sort, { sortList } from '../components/Sort';
import ProductItem from '../components/ProductItem';
import Skeleton from '../components/Skeleton';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import ProductModal from '../components/ProductModal';
import HomeCorusel from '../components/HomeCorusel';
import NoProducts from '../components/NoProducts';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth);
  const { categoryId, currentPage, changeSort, changeSearchValue } = useSelector(
    (state) => state.filterSlice,
  );
  const { product, status } = useSelector((state) => state.productSlice);
  const { openProductModal, setOpenProductModal } = React.useContext(AppContext);
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
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
    imageSlider: [],
    text: '',
  });

  const fetchProduct = async () => {
    const fetchCategory =
      categoryId > 0 && changeSearchValue.length == 0 ? `category=${categoryId}` : '';
    const fetchOrder = changeSort.sortProperty.includes('-') ? 'asc' : 'desc';
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
    if (window.location.search) {
      const paramsSearch = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === paramsSearch.sortProperty);
      dispatch(
        setFilters({
          ...paramsSearch,
          changeSort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchProduct();
    }
    isSearch.current = false;
  }, [categoryId, currentPage, changeSort.sortProperty, changeSearchValue]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: changeSort.sortProperty,
        changeSearchValue,
        currentPage,
        categoryId,
      });
      if (
        categoryId === 0 &&
        currentPage === 1 &&
        changeSearchValue === '' &&
        changeSort.name === 'Умолчанию' &&
        changeSort.sortProperty === 'default'
      ) {
        navigate(``);
      } else {
        navigate(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [changeSearchValue, currentPage, categoryId, changeSort.sortProperty]);

  //! ипользую два раза, нужно вынести код (неидеально решение)
  React.useEffect(() => {
    setTimeout(() => {
      if (auth.currentUser !== null) {
        dispatch(
          setUser({
            email: auth.currentUser.email,
            id: auth.currentUser.uid,
            token: auth.currentUser.accessToken,
          }),
        );
      }
    }, 2000);
  }, []);

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
      <HomeCorusel />
      <main className="product">
        <div className="product__container">
          <div className="product__filter">
            <div id="filters" className="filter-product__row">
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
            {product.length === 0 && status === 'success' && <NoProducts />}
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
