import React from 'react';

const NavBar = (props) => {
  return (
    <div id='navBar'>

      <div id="logo">Gallery.js</div>

      <div id="menu">
        <div id="back">
          <button type="button" onClick={() => {props.backToHome()}}>Back To Gallery</button>
        </div>

        <div id='searchBar'>
          Search by Artist: <input type="text" onChange={props.updateSearch} placeholder="Last Name, First Name">
            {/* {props.searchArtist} */}
          </input>
          <button id="searchSubmit" type='submit' onClick={() => {props.getArtist(props.searchArtist)}}>
            {/* <img src="./../images/searchIcon.png" alt="search"></img> */}
            Search
          </button>
        </div>
      </div>

    </div>
  )
}

export default NavBar;