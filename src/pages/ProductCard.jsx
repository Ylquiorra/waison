import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addProductToWishlist } from '../redux/productWishlist/slice';
import { addProductToCart } from '../redux/productCart/slice';
import ProductItem from '../components/Product/ProductItem/ProductItem';
import Loader from '../components/Loader';
import ProductCardItem from '../components/Product/ProductCardItem/ProductCardItem';

const ProductCard = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //TODO немного неправильно работает переключение продуктов по стрелкам

  const [productById, setProductById] = React.useState([]);
  const [productRelated, setProductRelated] = React.useState([]);
  const [loadingPage, setLoadingPage] = React.useState(false);

  const onClickToAddToWishlist = () => {
    dispatch(addProductToWishlist(productById[0]));
  };
  const onClickToAddFromProductCard = () => {
    dispatch(addProductToCart(productById[0]));
  };

  React.useEffect(() => {
    async function fetchProductById() {
      try {
        setLoadingPage(false);
        const { data } = await axios.get(
          'https://630b2463f280658a59d6a747.mockapi.io/product/' + id,
        );
        const relatedProduct = await axios.get(
          `https://630b2463f280658a59d6a747.mockapi.io/product${
            data.category.length === 1
              ? `${'?category=' + data.category}`
              : `${'?category=' + data.category[0]}`
          }${data.category.length > 1 ? `${'&category=' + data.category[1]}` : ''}${
            data.category.length === 3 ? `${'&category=' + data.category[2]}` : ''
          }`,
        );
        setProductById([data]);
        setProductRelated(relatedProduct.data.filter((obj) => obj.id !== id));
        setLoadingPage(true);
      } catch (error) {
        alert('Произошла ошибка при получении товара с сервера.');
        console.error('error');
      }
    }
    fetchProductById();
  }, [id]);

  return (
    <>
      {loadingPage ? (
        <>
          <section className="product-cart">
            <div className="product-cart__container">
              {productById.map((objProduct, index) => (
                <ProductCardItem
                  key={index}
                  {...objProduct}
                  setLoadingPage={setLoadingPage}
                  onClickToAddToWishlist={onClickToAddToWishlist}
                  onClickToAddFromProductCard={onClickToAddFromProductCard}
                />
              ))}
            </div>
          </section>
          <section className="related-product">
            <div className="related-product__container">
              <div className="related-product__title">
                <h3>Похожие товары</h3>
              </div>
              {productRelated.length > 0 ? (
                <div className="related-product__grid-items">
                  {productRelated.map((objRelated) => (
                    <ProductItem key={objRelated.id} {...objRelated} />
                  ))}
                </div>
              ) : (
                <div className="related-product__no-items">
                  <h6>Нет похожих товаров</h6>
                </div>
              )}
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductCard;
