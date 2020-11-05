import React, { Component } from 'react';

import './styles/app.css';
import ImageCard from './components/ImageCard';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: [],
      imagesUploaded: [],
      imagesSelected: [],
      albumTitle: "",
      albumDescription: "",
      album: ""
    };
  }

  handleChange = event => { 
    this.setState({ selectedFile: event.target.files[0] }); 
  }; 

  handleClickImage = (event, id) => {
    const selected = this.state.imagesSelected;

    event.currentTarget.classList.toggle("selected-border");

    if (!selected.includes(id)) {
      this.setState({imagesSelected: [...selected, id]})
    }

    if (selected.includes(id)) {
      this.setState({imagesSelected: selected.filter(i => {
        return i !== id
      })})
    }
  }

  uploadImage = event => {
    event.preventDefault();

    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('image', this.state.selectedFile);

    request.open('POST', 'https://api.imgur.com/3/image/');
    request.setRequestHeader('Authorization', 'Client-ID 2eb05aaddad3bf7');

    request.onreadystatechange = () => {
      if (request.status === 200 && request.readyState === 4) {
        const res = JSON.parse(request.responseText)
        this.setState({imagesUploaded: [...this.state.imagesUploaded, res.data]});
      }
    }

    request.send(formData)
  }

  uploadAlbum = () => {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    this.state.imagesSelected.forEach((img, id) => {
      formData.append(`deletehashes[${id}]`, img);
    })
    formData.append("title", this.state.albumTitle);
    formData.append("description", this.state.albumDescription);
    formData.append("cover", this.state.imagesSelected[0]);

    request.open('POST', 'https://api.imgur.com/3/album/');
    request.setRequestHeader('Authorization', 'Client-ID 2eb05aaddad3bf7');

    request.onreadystatechange = () => {
      if (request.status === 200 && request.readyState === 4) {
        const res = JSON.parse(request.responseText);
        this.setState({album: res.data.id});
      }
    }

    request.send(formData)
  }

  render() { 
    return ( 
      <div className="container">
        <h1 className="text-center my-4">Criador de álbuns Imgur</h1>

        <p>1) Selecione 1 imagem por vez: </p>   
        <form className="d-flex justify-content-around my-4" onSubmit={this.uploadImage}>
          <input className="mr-5 px-3 py-1" type="file" onChange={this.handleChange} /> 
          <input className="px-3 py-1" type="submit" value="Enviar" /> 
        </form>

        <div>
          {this.state.imagesUploaded.length > 0 ? <p>2) Clique nas imagens que deseja enviar para a criação de um álbum, ou adicione novas imagens acima: </p> : null }
        </div>

        <div className="d-flex flex-wrap justify-content-center" id="uploaded-images-container">
          {this.state.imagesUploaded.map(img => {
            return (
              <div className="m-3" onClick={(e) => this.handleClickImage(e, img.deletehash)}>
                <ImageCard imgUrl={img.link}/>
              </div>
            )
          })}
        </div>

        <div>
          {this.state.imagesSelected.length > 0 ? (
            <div className="my-4">
              <p>3) Clique no botão abaixo para criar o álbum: </p>
              <p class="text-muted">Opcional: Adicione um 'título' e/ou uma 'descrição' para o seu álbum!</p>
              <label className="mr-2" htmlFor="inp-title">Título:</label>
              <input id="inp-title" type="text" placeholder="Título..." value={this.state.albumTitle} onChange={e => {this.setState({albumTitle: e.target.value})}} /> <br/>
              
              <label className="mr-2" htmlFor="inp-desc">Descrição:</label>
              <input id="inp-desc" type="text" placeholder="Descrição..." value={this.state.albumDescription} onChange={e => {this.setState({albumDescription: e.target.value})}} /> <br/>
              
              <button className="my-3 btn btn-primary btn-sm" onClick={this.uploadAlbum}>Criar álbum</button>
            </div>
            ) : null}
        </div>

        <div>
          {this.state.album !== "" ? (
            <div className="alert alert-success" style={{cursor: "pointer"}} role="alert" onClick={() => {window.open(`https://imgur.com/a/${this.state.album}`, "_blank")}}>
              Álbum criado! Clique aqui para visualiza-lo: {`https://imgur.com/a/${this.state.album}`}
            </div>
          ) : null}
        </div>
      </div> 
    ); 
  }
}

