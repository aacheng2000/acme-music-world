import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios'

const Artists = (props) => {
  return ( <div>
  {props.artists.map((x) => (
    <div style={{ marginLeft: '1rem' }}>{x.name}</div>))}
  </div>
    )
}

const Albums = (props) => {
  return ( <div>
  {props.albums.map((x) => 
  
      (<div>
        <div style={{ marginLeft: '1rem' }}>{x.name}</div>
        <div style={{ marginLeft: '2rem' }}>{'   '}{x.artist.name}</div>
      </div>)
    )
  }
  </div>
    )
}

const Static = () => {
  return ( <b div style={{ marginLeft: '1rem' }}>Welcome to Acme Music World!!!</b>
    )
}

class Main extends Component {
  constructor() { 
    super()
    this.state = {
      albums: [{name: "nothing"}],
      artists: [{name: "nothing"}],
      selectedButton: 1
    }
  }
  
  async componentDidMount () {
    try {
      const res = await axios.get('/api/albums')
      const albums = res.data
      this.setState({albums})
      
      const res2 = await axios.get('/api/artists')
      const artists = res2.data
      this.setState({artists})
      
    } catch (err) {
      console.log('There was a problem making contact!')
    }
  }
  
  showStatic=()=> {
    this.setState({selectedButton:1})
    document.getElementById("1").className = "active";
    document.getElementById("2").className = "inactive";
    document.getElementById("3").className = "inactive";
  }
  
  showArtists=()=> {
    this.setState({selectedButton:2})
    document.getElementById("1").className = "inactive";
    document.getElementById("2").className = "active";
    document.getElementById("3").className = "inactive";
  }
  
  showAlbums=()=> {
    this.setState({selectedButton:3})
    document.getElementById("1").className = "inactive";
    document.getElementById("2").className = "inactive";
    document.getElementById("3").className = "active";
  }
  
  render() {
  
  let displayThis = {}
  if (this.state.selectedButton===1){displayThis = <Static />}
  if(this.state.selectedButton===2){displayThis = <Artists artists={this.state.artists} />}
  if(this.state.selectedButton===3){displayThis = <Albums albums={this.state.albums} />}

  return (
  <div>
  <div class="topnav">
  <a id='1' onClick={this.showStatic} class="active" href="#home">Home</a>
  <a id='2' onClick={this.showArtists} href="#artists">Artists ({this.state.artists.length})</a>
  <a id='3' onClick={this.showAlbums} href="#albums" >Albums ({this.state.albums.length})</a>
  </div>
  <br />
  {displayThis}
  </div>
   )
  }
}   

render(
  <Main />,
  document.getElementById('root')
);


