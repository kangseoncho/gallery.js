import React from 'react';

const NavBar = (props) => {
  return (
    <div id='navBar'>

      <div id="logo" onClick={() => {props.backToHome(); props.scrollToTop()}}>Gallery.js</div>

      <div id="menu">
        <div id="back">
          <button type="button" onClick={() => {props.backToHome(); props.scrollToTop()}}>Home</button>
        </div>

        <div id='searchBar'>
          <input type="text" onChange={props.updateSearch} placeholder="Search Artist">
          </input>
          <button id="searchSubmit" type='submit' onClick={() => {props.getArtist(props.searchField)}}>
             <img src="https://image.flaticon.com/icons/png/512/49/49116.png" alt="search"></img>
          </button>
        </div>
      </div>

    </div>
  )
}

export default NavBar;