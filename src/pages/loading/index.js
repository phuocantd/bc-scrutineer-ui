import React from "react";
import { connect } from "react-redux";

import "./index.css";
import { restoreToken } from "actions/auth";

function Loading({ dispatch }) {
  React.useEffect(() => {
    const token = localStorage.getItem("access-token");
    dispatch(restoreToken(token));
  }, [dispatch]);

  return (
    <div className="cont">
      <div className="paper"></div>
      <button className='btn-loading'>
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        Loading
      </button>
      <div className="g-cont">
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
        <div className="garbage"></div>
      </div>
    </div>
  );
}

export default connect()(Loading);
