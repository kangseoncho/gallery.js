import React from 'react';

const ImageModal = (props) => {
  return (
    <div id="modalContainer">
      <div id="modalArt">
        <img src={props.infoForModal.thumbnailUrl} alt='artwork'></img>
      </div>

      <div id="artInformation">
        <div className="modalContent">
          <span>Artist:</span> <br/>
          {props.artistName(props.infoForModal.artist)}
        </div>
        <div className="modalContent">
          <span>Title:</span> <br/>
          {props.infoForModal.title}
        </div>
        <div className="modalContent">
          <span>Year:</span> <br/>
          {props.infoForModal.year}
        </div>
        <div className="modalContent">
          <span>Medium:</span> <br/>
          {props.infoForModal.medium}
        </div>
        <div className="modalContent">
          <span>Dimensions:</span> <br/>
            {props.infoForModal.height}{props.infoForModal.units} x {props.infoForModal.width}{props.infoForModal.units}
        </div>
        <div className="modalContent">
          <span>Credit:</span> <br/>
          {props.infoForModal.creditLine}
        </div>
        <div className="modalContent">
          <span>Accession Number:</span> <br/>
          {props.infoForModal.accession_number}
        </div>
        <div className="modalContent" id="externalLink" onClick={()=>window.open(props.infoForModal.url)}>
          More Information
        </div>
      </div>

      <div id="modalExitButton">
        <button className='exitModal' onClick={props.closeModal}>X</button>
      </div>
    </div>
  )
}

export default ImageModal;