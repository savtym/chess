import React from 'react';

import './Loading.css';


const Loading = ({ isShow }) => {
  if (!isShow) return null;
  return (
    <div className="c-loading">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
};


export default Loading;
