// Topbar container

import PropTypes from 'prop-types';
import React from 'react';
import Addcat from './Addcat.js';
import Addlink from './Addlink.js';
import axios from 'axios';
import './Topbar.css';
import uuidv1 from 'uuid';

class Topbar extends React.Component {
  // Setup the local state for topbar view controll, ccatpanel is the panel for creating categories
  constructor(props) {
    super(props);
    this.state = {
      ccatpanel: false,
      inputurl: ''
    };
  }

  selectChange = e => {
    this.props.catFilter(e.target.value);
  };

  urlInputChange = e => {
    this.setState({
      inputurl: e.target.value
    });
  };

  ccatPanelContr_open = () => {
    this.setState({
      ccatpanel: true
    });
  };

  ccatPanelContr_close = () => {
    this.setState({
      ccatpanel: false
    });
  };

  handleAddCat = catname => {
    // Category name validation checking
    if (!catname) {
      alert('You must input a valid category name!');
    } else if (catname.length > 10) {
      alert('The category name must be less than 10 characters!');
    } else if (
      this.props.cat.cats.filter(cat => {
        return cat === catname;
      }).length > 0
    ) {
      alert('The category you want to addon is existed!');
    } else {
      this.props.addcat(catname);
      this.ccatPanelContr_close();
    }
  };

  // Checking if the link that would be added was alread existed or not
  handleAddlink = linkinfo => {
    if (this.props.links) {
      if (
        this.props.links.filter(link => {
          return link.requestUrl === linkinfo.requestUrl;
        }).length > 0
      ) {
        alert('The url you want to addon is existed!');
      } else {
        this.props.addlink(linkinfo);
      }
    } else {
      this.props.addlink(linkinfo);
    }
  };

  // Add link input value validation checking
  urlChk = str => {
    {
      let turl;
      const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
      if (regexp.test(str)) {
        turl = str;
        return turl;
      } else {
        alert('The URL you input is invalid!');
        return false;
      }
    }
  };

  // Backend response data validation checking
  ajaxResChk = data => {
    if (data) {
      return data;
    } else {
      return null;
    }
  };

  // Sending request to backend, retriving response data and adding links to the state
  addLinkInfo = () => {
    let url = this.urlChk(this.state.inputurl);
    if (!url) {
      return false;
    } else {
      this.severRequest = axios
        .get(`http://159.89.134.185:8000/api/getog`, {
          params: {
            url: url
          }
        })
        .then(response => {
          if (response.data.errorcode) {
            alert(response.data.msg);
            return false;
          } else {
            let tcat;
            this.props.filteron
              ? (tcat = this.props.filtercat)
              : (tcat = 'default');

            let linkinfo = {
              cat: tcat,
              id: uuidv1(),
              ogTitle: this.ajaxResChk(response.data.data.ogTitle),
              ogDescription: this.ajaxResChk(response.data.data.ogDescription),
              imgUrl: this.ajaxResChk(response.data.data.ogImage),
              requestUrl: response.data.requestUrl
            };
            this.handleAddlink(linkinfo);
          }

          this.setState({
            rawlinkinfo: response.data.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };
  render() {
    return (
      <div className="topbar">
        <div className="tbwrapper">
          <div />
          <div className="topmid">
            <div className="toplogo">
              <div className="tlogo" />
            </div>
            <div className="topbtn">
              {/*Checking create categories panel status and mount appropriate component*/}
              {this.state.ccatpanel === false ? (
                <Addlink
                  cats={this.props.cat.cats}
                  filteron={this.props.filteron}
                  filtercat={this.props.filtercat}
                  rawLinkinfo={this.state.rawlinkinfo}
                  selectChange={this.selectChange}
                  urlInputChange={this.urlInputChange}
                  addLinkInfo={this.addLinkInfo}
                  ccatPanelContr_open={this.ccatPanelContr_open}
                />
              ) : (
                <Addcat
                  close={this.ccatPanelContr_close}
                  handleAddCat={catname => this.handleAddCat(catname)}
                />
              )}
            </div>
            <div className="smenubtn">
              <i className="fas fa-bars" />
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
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
  cat: PropTypes.shape({
    cats: PropTypes.array.isRequired,
    currentcat: PropTypes.string
  }).isRequired
};

export default Topbar;
