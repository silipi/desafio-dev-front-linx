import React, { Component } from 'react';

import '../styles/components/image-card.css';

export default class ImageCard extends Component {
  render() {
    const { imgUrl } = this.props;

    return (
      <div className="card" style={{width: 15 + 'rem'}}>
        <img className="card-img-top" src={imgUrl} alt="Uploaded" />
        <div className="card-body">
          <h5 className="card-title">Imagem</h5>
          <button onClick={() => {window.open(`${imgUrl}`, "_blank")}} className="btn btn-secondary btn-sm">Abrir imagem</button>
        </div>
      </div>
    )
  }
}
