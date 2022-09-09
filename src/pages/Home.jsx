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

  const arr = {
    id: '0',
    image:
      'https://2.downloader.disk.yandex.ru/preview/00dea7714debea4701dccc0e2e715d95f5b03f089c8bf80e244d777b6194c773/inf/01o_pYfBgVMtMHMWvtPeeXIPbgQXfTahMz2sVcVdjNMi2UNdv8wnqKFB6v218GDYgl0ssrVxd22Onw3f63_LpA%3D%3D?uid=1528842725&filename=beolit-normal.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=1528842725&tknv=v2&size=1920x937',
    title: 'Beolit 15',
    price: '590.00',
    category: [1, 5],
    categoryName: ['Аксессуары', 'Для дома'],
    rating: 4,
    text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
  };

  console.log('image' in arr);

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
