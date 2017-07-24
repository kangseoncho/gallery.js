import React from 'react';

const Image = (props) => {
  let thumbnails = props.gallery.map((element, index) => {
    return (
    <div>
      <img key={index} src={element.thumbnailUrl} alt="paintings"></img>
    </div>
    )
  })

  return (
    <div>
      {thumbnails}
    </div>
  )
}

export default Image;