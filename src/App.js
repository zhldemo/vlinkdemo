//App.js is the main application container

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import List from './components/List/List.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import Topbar from './components/Topbar/Topbar.js';
import Instruction from './Instruction.js';
import { connect } from 'react-redux';
import { addCat, addLink, reset, catFilter } from './js/actions/index.js';
import './App.css';

// Geting the initial state
const mapStateToProps = state => {
  if (state.filteron) {
    return {
      links: state.links,
      demoData: state.demoData,
      cat: state.cat,
      filteron: state.filteron,
      filtercat: state.filtercat
    };
  } else {
    return { links: state.links, demoData: state.demoData, cat: state.cat };
  }
};
const mapDispatchToProps = dispatch => {
  return {
    addCat: catname => {
      dispatch(addCat(catname));
    },
    addLink: linkinfo => dispatch(addLink(linkinfo)),
    reset: () => dispatch(reset()),
    catFilter: catname => dispatch(catFilter(catname))
  };
};

class App extends Component {
  linkFilter = cat => {
    return null;
  };

  // Reset the local data
  resetIt = () => {
    localStorage.clear();
    this.props.reset();
  };

  render() {
    const { cat } = this.props;
    return (
      <div className="wrapper">
        <Topbar
          links={this.props.links}
          cat={cat}
          filteron={this.props.filteron}
          filtercat={this.props.filtercat}
          addcat={catname => this.props.addCat(catname)}
          addlink={linkinfo => this.props.addLink(linkinfo)}
          catFilter={catname => this.props.catFilter(catname)}
        />
        <div className="leftarea" />
        <div className="main">
          <Sidebar
            cat={cat}
            reset={() => this.resetIt()}
            catFilter={catname => this.props.catFilter(catname)}
          />
          <div className="mainlist">
            <List />
            <Instruction />
          </div>
        </div>
        <div className="rightarea" />
      </div>
    );
  }
}

App.propTypes = {
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
  cat: PropTypes.shape({
    cats: PropTypes.array.isRequired,
    currentcat: PropTypes.string
  }).isRequired,
  filteron: PropTypes.bool,
  filtercat: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
