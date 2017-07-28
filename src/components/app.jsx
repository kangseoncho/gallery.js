import React, { Component } from 'react';
import axios from 'axios';
import Image from './image.jsx';
import NavBar from './navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      searchArtist: ''
    };
    //list of functions to pass down
    this.loadMoreArt = this.loadMoreArt.bind(this);
    this.artistName = this.artistName.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.getArtist = this.getArtist.bind(this);
    this.backToHome = this.backToHome.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/initialGallery')
    .then(res => {
      this.setState({ gallery: res.data });
    });

    axios.get('http://localhost:3000/ids')
    .then(res => localStorage.setItem('id', JSON.stringify(res.data)) );

    axios.get('http://localhost:3000/allArtist')
    .then(res => localStorage.setItem('artists', JSON.stringify(res.data)) );
  }

  artistName (string) {
    const firstName = string.replace(/, /, ',').split(',');
    const lastName = firstName.splice(0, 1);
    return `${firstName.join('')} ${lastName}`;
  }

  //make functions to pass down
  loadMoreArt () {
    axios.get('http://localhost:3000/gallery')
    .then(moreArts => {
      let tempGallery = this.state.gallery;
      tempGallery = tempGallery.concat(moreArts.data);

      this.setState({ gallery: tempGallery });
    });
  }

  //go to top of the artwork list
  scrollToTop () {
    // let x = window.scrollX, y = window.scrollY;
    // console.log('y-coordinate', y)
    // setInterval(() => {  },10)
    window.scrollTo(0, 0);
  }

  //update Search field
  updateSearch(event) {
    this.setState({ searchArtist:event.target.value });
  }

  //find artist according to search field
  getArtist (search) {
    const matchingArtists = JSON.parse(localStorage.getItem('artists')).filter((artInfo, index) => {
      return artInfo.artist.toLowerCase().includes(search.toLowerCase());
    })
    this.setState({ gallery:matchingArtists });
  }

  backToHome() {
    axios.get('http://localhost:3000/initialGallery')
    .then(res => this.setState({ gallery: res.data }));
  }

  render() {
    return (
      <div>
        {/* navigation bar */}
        <NavBar searchArtist={this.state.searchArtist} updateSearch={this.updateSearch} getArtist={this.getArtist}
          backToHome={this.backToHome} scrollToTop={this.scrollToTop}/>

        {/*images*/}
        <Image gallery={this.state.gallery} artistName={this.artistName}/>

        {/* button to scroll to top of page */}
        <div id="scrollToTop">
          <button onClick={() => {this.scrollToTop()}}>Top</button>
        </div>
        {/* button to load more artworks */}
         <div id='loadImages'>
          <button onClick={() => {this.loadMoreArt()}}>More Result</button>
         </div>
      </div>
    )
  }
}

export default App;