import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={317}
      height={383}
      viewBox="0 0 317 383"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <rect x="0" y="-1" rx="3" ry="3" width="296" height="301" />
      <rect x="123" y="208" rx="0" ry="0" width="71" height="55" />
      <rect x="0" y="330" rx="0" ry="0" width="81" height="17" />
      <rect x="0" y="369" rx="0" ry="0" width="70" height="16" />
    </ContentLoader>
  );
};

export default Skeleton;
