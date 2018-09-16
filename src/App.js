import React, { Component } from 'react';
import summer1 from './images/summer1.jpg'; 
import winter1 from './images/winter1.jpg';
import autumn1 from './images/autumn1.jpg';
import './App.css';
import Navbar from "./components/navbar";
import Category from "./components/category";

const summerPoems = ["summer1 poem", "summer2 poem", "summer3 poem"];
const winterPoems = ["winter1 poem", "winter2 poem", "winter3 poem"];
const autumnPoems = ["autumn1 poem", "autumn2 poem", "autumn3 poem"];

const poems = {
  'summer' : summerPoems,
  'winter' : winterPoems,
  'autumn' : autumnPoems,
}

const images = {
  'summer': [
    summer1,
  ],
  'winter': [
    winter1,
  ],
  'autumn': [
    autumn1,
  ]
};

class App extends Component {

  constructor(props) {
    super(props);

    this.setImageSeason = this.setImageSeason.bind(this);
    this.setPoemSeason = this.setPoemSeason.bind(this);
    this.setTab = this.setTab.bind(this);

    this.state = {      
      selectedTab: 0,
      imageSeason: 'summer',
      poemSeason: 'summer',
    }
  }

  render() {
    return (
      <main className="grid-container-all">
        <div className="title">
          <h1>Kunstutstilling</h1>
        </div>
        <div className="navbar" id="navbar">
          <Navbar onChange={this.setTab}/>
        </div>
        <div className="contentImage">
          <img src={images[this.state.imageSeason][this.state.selectedTab]} alt="Dette er bildet" />
        </div>
        <div className="contentText">
          {poems[this.state.poemSeason][this.state.selectedTab]}
        </div>
        <div className="contentAudio">
          <audio controls>
            <source src="test.mp3" type="audio/mpeg" />
            Your browser does not support this element.
          </audio>
        </div>
        <div className="categories">
          <Category onChange={this.setImageSeason} /> <br />
          <Category onChange={this.setPoemSeason}/> <br />
          <Category />
        </div>
      </main>
    );
  }
  
  setImageSeason(season) {
    this.setState({
      imageSeason: season,
    })
  }

  setPoemSeason(season) {
    this.setState({
      poemSeason: season,
    })
  }

  setTab(tab) {
    this.setState({
      selectedTab: tab,
    })
  }
}

export default App;
