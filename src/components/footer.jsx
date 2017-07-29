import React from 'react';

const Footer = (props) => {
  if (props.searchField.length === 0) {
    return (
      <div>
        <div id="scrollToTop">
          <button onClick={() => { props.scrollToTop() }}>Top</button>
        </div>
        <div id='loadImages'>
          <button onClick={() => { props.loadMoreArt() }}>More Result</button>
        </div>
      </div>
    )
  } else {
    return (
    <div>
      <div id="scrollToTop">
        <button onClick={() => this.scrollToTop() }>Top</button>
      </div>
    </div>
  )
  }
}

export default Footer;