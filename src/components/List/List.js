// List component is responsible for list out all the visual links

import React from 'react';
import './List.css';
import Link from './Link.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// checking if the list filter was actived
const mapStateToProps = state => {
  if (state.filteron) {
    return {
      links: state.links,
      demoData: state.demoData,
      filteron: state.filteron,
      filtercat: state.filtercat
    };
  } else {
    return { links: state.links, demoData: state.demoData };
  }
};

const List = props => {

   //totallist is all links in the state
  let totallist;
  if (props.links.length < 1) {
    totallist = props.demoData;
  } else {
    totallist = props.links.concat(props.demoData);
  }

  //inputlist is the links which will be injected to link component
  let inputlist;
  if (props.filteron) {
    if (props.filtercat === 'default') {
      inputlist = totallist;
    } else {
      inputlist = totallist.filter(link => {
        return link.cat === props.filtercat;
      });
    }
  } else {
    inputlist = totallist;
  }

  // Map out all the links
  let list;
  list = inputlist.map(link => {
    let rowindex = inputlist.indexOf(link);
    return <Link key={link.id} rowindex={rowindex} {...link} />;
  });

  return <div className="listwraper">{list}</div>;
};

List.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      cat: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      ogTitle: PropTypes.string,
      imgUrl: PropTypes.object,
      requestUrl: PropTypes.string.isRequired,
      ogDescription: PropTypes.string
    }).isRequired
  ),
  demoData: PropTypes.arrayOf(
    PropTypes.shape({
      cat: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      ogTitle: PropTypes.string,
      imgUrl: PropTypes.object,
      requestUrl: PropTypes.string.isRequired,
      ogDescription: PropTypes.string
    }).isRequired
  ).isRequired,
  filteron: PropTypes.bool,
  filtercat: PropTypes.string
};

export default connect(mapStateToProps)(List);
