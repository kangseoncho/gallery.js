import React from 'react';

const Footer = (props) => {
  if (props.searchField.length === 0) {
    return (
      <div>
        {/* button to scroll to top of page */}
        <div id="scrollToTop">
          <button onClick={() => { props.scrollToTop() }}>Top</button>
        </div>
        {/* button to load more artworks */}
        <div id='loadImages'>
          <button onClick={() => { props.loadMoreArt() }}>More Result</button>
        </div>
      </div>
    )
  } else {
    return (
    <div>
      {/* button to scroll to top of page */}
      <div id="scrollToTop">
        <button onClick={() => { props.scrollToTop() }}>Top</button>
      </div>
    </div>
  )
  }
}

export default Footer;