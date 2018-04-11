// Addlink component is responsiable for collecting the links input

import PropTypes from 'prop-types';
import React from 'react';

const Addlink = props => {

  // The view of categories selection
  const options = props.cats.map(cat => {
    return (
      <option key={cat} value={cat}>
        {cat}
      </option>
    );
  });
  return (
    <div className="addlinkbar">

    {/*Checking if the filter was fired*/}
      <select
        value={props.filteron ? props.filtercat : 'default'}
        name="cats"
        ref={ref => {
          this.catselect = ref;
        }}
        onChange={props.selectChange}
      >
        <option value="default">Homepage</option>
        {options}
      </select>
      <input id="links" type="text" onChange={props.urlInputChange} />
      <button
        onClick={() => {
          props.addLinkInfo();
        }}
      >
        AddLink
      </button>
      <button onClick={props.ccatPanelContr_open}>CreateCategory</button>
      <div><i className="fab fa-vine"></i> 1000</div>


    </div>
  );
};

Addlink.propTypes = {
  cats: PropTypes.array.isRequired,
  filteron: PropTypes.bool,
  filtercat: PropTypes.string
};

export default Addlink;
