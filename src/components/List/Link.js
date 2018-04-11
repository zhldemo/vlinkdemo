//link component is responsible for render every single link view

import React from 'react';
import PropTypes from 'prop-types';

const Link = props => {
  // checking if the ogimg was existed, otherwise will render the error img
  let logoback = !props.imgUrl
    ? 'http://zhlio.com/documents/error.jpg'
    : props.imgUrl.url;

  // colorful the image's border
  const randomColor = () => {
    let rand = Math.floor(Math.random() * 0xffffff).toString(16);
    if (rand.length === 6) {
      return rand;
    } else {
      return randomColor();
    }
  };

  return (
    <div className="rowwraper">
      <a href={props.requestUrl} target="blank" rel="noopener noreferrer">
        <div className="linkct">
          <div className="ogimg">
            <div
              className="imgwraper"
              style={{
                backgroundImage: `url(${logoback})`,
                border: `solid 2px #${randomColor()}`
              }}
            />
          </div>
          <div className="linktitle">
            {!props.ogTitle ? 'Untitled' : props.ogTitle.slice(0, 50)}
          </div>
          <div className="linkdsp">
            {/*checking and rendering the description of links*/}
            {!props.ogDescription ? (
              "This website doesn't have a description!"
            ) : (
              props.ogDescription.slice(0, 70)
            )}...
          </div>
        </div>
      </a>
    </div>
  );
};

Link.propTypes = {
  ogTitle: PropTypes.string,
  imgUrl: PropTypes.object,
  requestUrl: PropTypes.string.isRequired,
  ogDescription: PropTypes.string
};

export default Link;
