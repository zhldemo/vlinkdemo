// Sidebar component is responsible for rendering the view of sidebar

import React from 'react';
import './Sidebar.css';
import PropTypes from 'prop-types';

const Sidebar = props => {
  //Map out the leftside categories button
  const catbtns = props.cat.cats.map(cat => {
    return (
      <div
        className="sbbtn"
        key={cat}
        onClick={() => {
          props.catFilter(cat);
        }}
      >
        <i className="far fa-arrow-alt-circle-right btnlogocat" />
        {cat}
      </div>
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebtnwraper">
        <div className="sbbtn" onClick={props.reset}>
          <i className="fas fa-redo-alt btnlogo" />Reset
        </div>
        <div
          className="sbbtn"
          onClick={() => {
            props.catFilter('default');
          }}
        >
          <i className="fas fa-home btnlogo" />
          Homepage
        </div>
        <div className="sbbtn">
          <i className="far fa-calendar btnlogo" />Today
        </div>
        <div className="sbbtn">
          <i className="far fa-calendar-alt btnlogo" />Last 7 Days
        </div>
        <div className="sbdivider">
          <div className="sbdvtitle">Categories</div>
          <div />
          <div className="sbdva" />
          <div className="sbdvb" />
        </div>
        {catbtns}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  cat: PropTypes.shape({
    cats: PropTypes.array.isRequired,
    currentcat: PropTypes.string
  }).isRequired
};

export default Sidebar;
