import React from 'react';
import ReactLoading from 'react-loading';
import './FullPageLoading.css'; 

function index() {
  return (
    <div className="full-page-loading">
      <ReactLoading type="balls" color="#32cd32" height={100} width={100} />
    </div>
  )
}

export default index;