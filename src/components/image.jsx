import React from 'react';

const Image = (props) => {
  let thumbnails = props.gallery.map((element, index) => {
    return (
    <div className="painting" key={index}>
      <div className="image">
        <img src={element.thumbnailUrl} alt="paintings"></img>
      </div>
      <div className="artist">{element.artist}</div>
      <div className="title">{element.title}</div>
      <div className="year">{element.year}</div>
    </div>
    )
  })

  return (
    <div id="gallery">
      {thumbnails}
    </div>
  )
}

export default Image;