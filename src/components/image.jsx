import React from 'react';
import ReactModal from 'react-modal';
import ImageModal from './imageModal.jsx';

const Image = (props) => {
  let thumbnails = props.gallery.map((element, index) => {
    return (
      <div className="painting" key={index}>

        <div className="image" onClick={() => { props.openModal(); props.getInfoForModal(element) }}>
          <img src={element.thumbnailUrl} alt="paintings"></img>
        </div>

        <div className="title">
          {element.title}
        </div>

        <div className="artist">
          <strong>{props.artistName(element.artist)}</strong>
        </div>

        <div className="year">
          {element.year}
        </div>

      </div>
    )
  })

  return (
    <div id="gallery">
      <ReactModal
        isOpen={props.showModal}
        contentLabel="Art Information Modal"
      >
        <ImageModal
          infoForModal={props.infoForModal}
          artistName={props.artistName}
          closeModal={props.closeModal}
        />
      </ReactModal>

      {thumbnails}
    </div>
  )
}

export default Image;