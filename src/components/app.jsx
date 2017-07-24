import React, { Component } from 'react';
import axios from 'axios';
import Image from './image.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: []
    };
    //list of functions to pass down
  }

  componentDidMount() {
    axios.get('http://localhost:3000/gallery')
    .then(res => this.setState({ gallery: res.data }));
  }

  //make functions to pass down
  render() {
    return (
      <div>
        {/* search bar and logo */}
        <div id='navBar'>
          <span id="logo">Gallery.js</span>
          <span id="searchBar"> <input type="text"></input> </span>
        </div>
        {/*images*/}
        <div id="gallery">
          <Image gallery={this.state.gallery}/>
        </div>
      </div>
    )
  }
}

export default App;