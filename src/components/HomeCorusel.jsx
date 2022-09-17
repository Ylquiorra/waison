import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import SliderSkeleton from '../components/SliderSkeleton';

const HomeCorusel = () => {
  const [contentSlider, setContentSlider] = React.useState([]);
  const [indexSlider, setIndexSlider] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchSliderContent() {
      try {
        const mainSliderResponse = await axios.get(
          'https://630b2463f280658a59d6a747.mockapi.io/mainSliderImage',
        );
        setContentSlider(mainSliderResponse.data);
        setLoading(false);
      } catch (error) {
        alert('Ошибка. Не беспокойтесь, мы уже работаем!');
        console.error('Произошла ошибка при получении контента с сервера');
      }
    }
    fetchSliderContent();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  });

  const nextSlide = () => {
    if (indexSlider !== contentSlider.length) {
      setIndexSlider(indexSlider + 1);
    } else if (indexSlider === contentSlider.length) {
      setIndexSlider(1);
    }
  };

  const moveDot = (index) => {
    setIndexSlider(index);
  };

  return (
    <>
      {loading ? (
        <SliderSkeleton />
      ) : (
        <section className="corusel">
          <div className="corusel__body ">
            {contentSlider.map((objSlider, index) => (
              <div
                key={objSlider.id}
                className={
                  indexSlider === index + 1 ? 'body-corusel body-corusel-active' : 'body-corusel'
                }>
                <div className="body-corusel__image">
                  <img src={objSlider.image} alt="#" />
                </div>
                <div className="body-corusel__main">
                  <div className="body-corusel-main__title">
                    <h1>{objSlider.title}</h1>
                  </div>
                  <div className="body-corusel-main__text">
                    <p>{objSlider.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="body-corusel__dots">
              {[...new Array(3)].map((_, index) => (
                <div
                  onClick={() => moveDot(index + 1)}
                  key={index}
                  className={
                    index + 1 === indexSlider
                      ? 'body-corusel-dots__dot body-corusel-dots__dot-active'
                      : 'body-corusel-dots__dot'
                  }></div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HomeCorusel;
