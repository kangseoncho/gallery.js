import React from 'react';

const NavBar = (props) => {
  return (
    <div id='navBar'>

      <div id="logo">Gallery.js</div>

      <div id="menu">
        <div id='searchBar'>
          Search by Artist: <input type="text" onChange={props.updateSearch} placeholder="Last Name, First Name">
            {/* {props.searchArtist} */}
          </input>
          <button type='submit' onClick={() => {props.getArtist(props.searchArtist)}}>Search</button>
        </div>
      </div>

    </div>
  )
}

export default NavBar;