import Axios from 'axios';
import React, { Component } from 'react';
import Card from './components/Card';

import './styles/app.css'
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      hashtag: ""
    };
  }

  handleChange = (e) => {
    this.setState({ hashtag: e.target.value });
  }

  handleSubmit = (e) => {
    if (this.state.hashtag !== "") {
      Axios.post('http://localhost:3001/api/hashtag', {hashtag: this.state.hashtag})
        .then(res => this.setState({ data: res.data }));
    }
    e.preventDefault();
  }

  render() {

    return (
      <div id="container">

        <div id="heading-container">
          <h1>#hashtag Search</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.hashtag} onChange={this.handleChange} placeholder="Digite uma #hashtag sem o '#'..."/>
            <input type="submit" value="Procurar" />
          </form>
        </div>
  
        <div id="container-cards">
          {this.state.data.map((item, key) => {
            return <Card 
              key={key}
              imgUrl={item.user.profile_image_url_https.replace("_normal", "")} 
              user={item.user.name} 
              username={item.user.screen_name} 
              text={item.text} 
              postedAt={item.created_at}
              profileUrl={item.user.url}
            /> 
          })}
        </div>
      </div>
    );
  }
}