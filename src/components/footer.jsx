import React from 'react';

const Footer = (props) => {
  if (props.searchField.length === 0) {
    return (
      <div>
        {/* button to scroll to top of page */}
        <div id="scrollToTop">
          <button onClick={() => { this.scrollToTop() }}>Top</button>
        </div>
        {/* button to load more artworks */}
        <div id='loadImages'>
          <button onClick={() => { this.loadMoreArt() }}>More Result</button>
        </div>
      </div>
    )
  } else {
    return (
    <div>
      {/* button to scroll to top of page */}
      <div id="scrollToTop">
        <button onClick={() => { this.scrollToTop() }}>Top</button>
      </div>
    </div>
  )
  }
}

export default Footer;