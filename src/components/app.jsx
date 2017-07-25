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
    this.loadMoreArt = this.loadMoreArt.bind(this);
    this.artistName = this.artistName.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/initialGallery')
    .then(res => this.setState({ gallery: res.data }));
  }

  artistName (string) {
    let firstName = string.replace(/, /, ',').split(',');
    let lastName = firstName.splice(0, 1);
    return `${firstName.join('')} ${lastName}`
  }

  //make functions to pass down
  loadMoreArt () {
    axios.get('http://localhost:3000/gallery')
    .then(moreArts => {
      let tempGallery = this.state.gallery;
      tempGallery = tempGallery.concat(moreArts.data);

      this.setState({ gallery: tempGallery })
    });
  }

  render() {
    return (
      <div>

        {/* search bar and logo */}
        <div id='navBar'>
          <div id="logo">Gallery.js</div>
        </div>

        {/*images*/}
        <Image gallery={this.state.gallery} artistName={this.artistName}/>

        {/* button to load more artworks */}
         <div id='loadImages'>
          <button onClick={()=>{this.loadMoreArt()}}>Load More Artworks</button>
         </div>
      </div>
    )
  }
}

export default App;