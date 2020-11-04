import React, { Component } from 'react';
import formatDate from '../utils/formatDate';

import '../styles/components/card.css'

export default class Card extends Component {

  render() {
    const { imgUrl, user, username, text, postedAt, profileUrl } = this.props;

    const regex = new RegExp("https://t.co/(.*)");
    const textWithoutUrl = text.replace(regex, "");
    const onlyUrlFromText = text.match(regex);

    const openProfile = () => {
      window.open(`https://twitter.com/${username}`, "_blank")
    }

    return (
      <div className="card-container">
        <div className="profile-info">
          <img src={imgUrl} alt="Perfil" onClick={openProfile}/>
          <div> 
            <h1 onClick={openProfile}>{user}</h1>
            <span onClick={openProfile}>@{username}</span>
          </div>
        </div>
        <p className="text">{textWithoutUrl}</p>
        <a className="link" onClick={() => {window.open(onlyUrlFromText !== null ? onlyUrlFromText[0] : null, "_blank")}}>{onlyUrlFromText !== null ? onlyUrlFromText[0] : null}</a>
        <p className="date">{formatDate(postedAt)}</p>
      </div>
    )
  }
}
