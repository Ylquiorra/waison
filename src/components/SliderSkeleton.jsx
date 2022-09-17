import React from 'react';
import ContentLoader from 'react-content-loader';

const SliderSkeleton = (props) => (
  <section className="slider-skeleton">
    <ContentLoader
      speed={2}
      width={1920}
      height={725}
      viewBox="0 0 1920 725"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="0" y="2" rx="0" ry="0" width="100%" height="700" />
      <rect x="90" y="40" rx="0" ry="0" width="151" height="152" />
      <circle cx="283" cy="204" r="4" />
      <circle cx="296" cy="204" r="4" />
      <circle cx="309" cy="204" r="4" />
      <rect x="345" y="107" rx="0" ry="0" width="110" height="13" />
      <rect x="345" y="123" rx="0" ry="0" width="77" height="9" />
    </ContentLoader>
  </section>
);

export default SliderSkeleton;
