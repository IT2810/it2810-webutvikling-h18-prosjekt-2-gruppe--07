import React, { Component } from 'react';
import axios from 'axios';
//import Poem from './components/poem';

import summer1 from './images/summer1.jpg';
import winter1 from './images/winter1.jpg';
import autumn1 from './images/autumn1.jpg';
import summer2 from './images/summer2.jpg';
import winter2 from './images/winter2.jpg';
import autumn2 from './images/autumn2.jpg';
import summer3 from './images/summer3.jpg';
import winter3 from './images/winter3.jpg';
import autumn3 from './images/autumn3.jpg';
import summer4 from './images/summer4.jpg';
import winter4 from './images/winter4.jpg';
import autumn4 from './images/autumn4.jpg';



import './App.css';
import Navbar from "./components/navbar";
import Category from "./components/category";
import Content from './components/content';

const images = {
  'summer': [
    summer1, summer2, summer3, summer4,
  ],
  'winter': [
    winter1, winter2, winter3, winter4,
  ],
  'autumn': [
    autumn1, autumn2, autumn3, autumn4,
  ]
};


class App extends Component {

  constructor(props) {
    super(props);

    this.setImageSeason = this.setImageSeason.bind(this);
    this.setPoemSeason = this.setPoemSeason.bind(this);
    this.setTab = this.setTab.bind(this);
    this.setAudioSeason = this.setAudioSeason.bind(this);

    this.state = {
      selectedTab: 0,
      imageSeason: 'summer',
      poemSeason: 'summer',
      audioSeason: 'summer',
      poems: []
    }
  }

  
  // this method is called only once after page load 
  async componentWillMount() {
    let url = '/text/summer/'+this.state.selectedTab+'.json';
    axios.get(url)
      .then(res => {
        let poems = res.data;
        this.setState({ poems });
      })
  }

  render() {
    return (
      <main className="grid-container-all">
        <div className="title">
          <h1>Kunstutstilling</h1>
        </div>
        <div className="navbar" id="navbar">
          <Navbar onChange={this.setTab} />
        </div>
        <div className="contentImage">
          <img src={images[this.state.imageSeason][this.state.selectedTab]} alt="Dette er bildet" />
        </div>
        <div className="contentText">
          {this.state.poems.map(poem => (
                <span key={poem.id}>
                  <h1>{poem.title}</h1>
                  <p>{poem.body}</p>
                  <p>{this.props.data}</p>
                </span>
              ))}
        </div>
        
        <Content audioSeason={this.state.audioSeason} tabId={this.state.selectedTab} />

        <div className="categories">
          <h2>Image</h2>
          <Category onChange={this.setImageSeason} /><br />
          <h2>Text</h2>
          <Category onChange={this.setPoemSeason} /> <br />
          <h2>Audio</h2>
          <Category onChange={this.setAudioSeason} />
        </div>
      </main>
    );
  }

  // Sets state for season (summer, winter, autumn)
  setImageSeason(season) {
    this.setState({
      imageSeason: season,
    })
  }
  setPoemSeason(season) {
    this.setState({
      poemSeason: season,
    })
    let url = '/text/'+season+'/'+this.state.selectedTab+'.json';
    axios.get(url)
      .then(res => {
        let poems = res.data;
        this.setState({ poems });
      })
  }
  setAudioSeason(season) {
    this.setState({
      audioSeason: season,
    })
  }

// Sets tab index (0-3)
  setTab(tab) {
    this.setState({
      selectedTab: tab,
    })
    let url = '/text/'+this.state.poemSeason+'/'+tab+'.json';
    axios.get(url)
      .then(res => {
        let poems = res.data;
        this.setState({ poems });
      })
  }
}

export default App;
