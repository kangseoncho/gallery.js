import React, { Component } from 'react';
import axios from 'axios';
import Image from './image.jsx';
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      searchField: '',
      loadBatch: 1
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
    axios.get('http://localhost:3000/ids')
    .then(res => localStorage.setItem('id', JSON.stringify(res.data)) )
    .then(res => {
      axios.get('http://localhost:3000/allArtist')
      .then(res => {
        localStorage.setItem('artists', JSON.stringify(res.data))
        return JSON.parse( localStorage.getItem('artists') );
      })
      .then(cachedInfo => {
        //console.log("cached Info: ", cachedInfo)
        const initialDisplay = cachedInfo.filter((info, index) => index < 12);
        this.setState({gallery: initialDisplay});
      })
    })
  }

  artistName (string) {
    const firstName = string.replace(/, /, ',').split(',');
    const lastName = firstName.splice(0, 1);
    return `${firstName.join('')} ${lastName}`;
  }

  //make functions to pass down
  loadMoreArt () {
    let tempGallery = this.state.gallery;
    let dataToAppend = JSON.parse(localStorage.getItem('artists'))
      .filter((moreArtist, index) => {
        return index >= (12 * this.state.loadBatch) && index < (12 * (this.state.loadBatch + 1));
      })
    // console.log("cachedArtInfo: ", JSON.parse(localStorage.getItem('artists')))
    //console.log('newdata', dataToAppend)
    tempGallery = tempGallery.concat(dataToAppend);
    //console.log('new gallery after more loads: ', tempGallery)
    this.setState({
      gallery: tempGallery,
      loadBatch: this.state.loadBatch + 1
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
    this.setState({ searchField:event.target.value });
  }

  //find artist according to search field
  getArtist (search) {
    const matchingArtists = JSON.parse(localStorage.getItem('artists')).filter((artInfo, index) => {
      return artInfo.artist.toLowerCase().includes(search.toLowerCase());
    })
    this.setState({ gallery:matchingArtists });
  }

  backToHome() {

    const tempGallery = JSON.parse(localStorage.getItem('artists')).filter((element, index) => index < 12)
    this.setState({
      gallery: tempGallery,
      searchField: ''
    });
  }

  render() {
    return (
      <div>
        {/* navigation bar */}
        <NavBar searchField={this.state.searchField} updateSearch={this.updateSearch} getArtist={this.getArtist}
          backToHome={this.backToHome} scrollToTop={this.scrollToTop}/>

        {/*images*/}
        <Image gallery={this.state.gallery} artistName={this.artistName}/>

        {/* footer */}
        <Footer scrollToTop={this.scrollToTop} loadMoreArt={this.loadMoreArt} searchField={this.state.searchField}/>
      </div>
    )
  }
}

export default App;