import React from 'react';
import { Link } from 'react-router-dom';

const EmptyItem = ({ title }) => {
  return (
    <div className="empty">
      <div className="empty__body">
        <div className="empty__body-text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 8 8">
            <path
              fill="currentColor"
              d="M.34 0A.5.5 0 0 0 0 .5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.09 0a.5.5 0 0 0-.06 0zM1.5 1c.28 0 .5.22.5.5s-.22.5-.5.5s-.5-.22-.5-.5s.22-.5.5-.5zm2 0h3c.28 0 .5.22.5.5s-.22.5-.5.5h-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zM1 3h6v4H1V3z"
            />
          </svg>
          <h3>{title}</h3>
        </div>
        <Link to="/">
          <div className="empty__body-button black-button ">
            <p>Назад к покупкам</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmptyItem;
