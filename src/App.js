import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import Navbar from "./components/navbar";
import Category from "./components/category";
import Content from "./components/content";


class App extends Component {
  constructor(props) {
    super(props);

    this.setImageSeason = this.setImageSeason.bind(this);
    this.setPoemSeason = this.setPoemSeason.bind(this);
    this.setTab = this.setTab.bind(this);
    this.setAudioSeason = this.setAudioSeason.bind(this);

    this.state = {
      selectedTab: 0,
      imageSeason: "summer",
      poemSeason: "summer",
      audioSeason: "summer",
      poems: [],
      svgURL: ""
    };
  }

  // loads text and picture the first time the page loads 
  async componentWillMount() {
    let url = "/text/summer/" + this.state.selectedTab + ".json";
    axios.get(url).then(res => {
      let poems = res.data;
      this.setState({ poems });
    });

    let imageUrl = "/img/summer/" + this.state.selectedTab + ".svg";
    axios.get(imageUrl).then(res => {
      let svgURL = res.data;
      this.setState( { svgURL});
    });
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
       
        <Content
          svgURL ={this.state.svgURL}
          poems={this.state.poems}
          audioSeason={this.state.audioSeason}
          tabId={this.state.selectedTab}
        />

        <div className="categories">
          <h2>Image</h2>
          <Category onChange={this.setImageSeason} />
          <br />
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
      imageSeason: season
    });
    let url = "/img/" + season + "/" + this.state.selectedTab + ".svg";
    axios.get(url).then(res => {
      let svgURL = res.data;
      this.setState( { svgURL});
    });
  }

  setPoemSeason(season) {
    this.setState({
      poemSeason: season
    });
    let url = "/text/" + season + "/" + this.state.selectedTab + ".json";
    axios.get(url).then(res => {
      let poems = res.data;
      this.setState({ poems });
    });
  }

  setAudioSeason(season) {
    this.setState({
      audioSeason: season
    });
  }

  // Sets tab index (0-3)
  setTab(tab) {
    this.setState({
      selectedTab: tab
    });
    let url = "/text/" + this.state.poemSeason + "/" + tab + ".json";
    axios.get(url).then(res => {
      let poems = res.data;
      this.setState({ poems });
    });
    let imageUrl = "/img/" + this.state.imageSeason + "/" + tab + ".svg";
    axios.get(imageUrl).then(res => {
      let svgURL = res.data;
      this.setState({ svgURL });
    });
  }
}

export default App;
