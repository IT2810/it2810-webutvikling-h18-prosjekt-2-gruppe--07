import React, { Component } from "react";
import axios from "axios";

import "./styles/App.css";
import Navbar from "./components/navbar";
import Category from "./components/category";
import Content from "./components/content";

const projectDir = "/prosjekt2";

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

  // loads picture and text immediately after first render
  componentDidMount() {
    this.fetchText(this.state.poemSeason, this.state.selectedTab);
    this.fetchImage(this.state.imageSeason, this.state.selectedTab);
  }

  // fetch json file or retrieve from sessionStorage if already fetched
  fetchText(poemSeason, tab) {
    let url = projectDir + "/text/" + poemSeason + "/" + tab + ".json";
    if (sessionStorage.getItem(url) === null) {
      axios
        .get(url)
        .then(res => {
          let poems = res.data;
          this.setState({ poems });
          sessionStorage.setItem(url, JSON.stringify(poems));
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      this.setState({
        poems: JSON.parse(sessionStorage.getItem(url))
      });
    }
  }

  // fetch svg file or retrieve from sessionStorage if already fetched
  fetchImage(imageSeason, tab) {
    let imageUrl = projectDir + "/img/" + imageSeason + "/" + tab + ".svg";
    if (sessionStorage.getItem(imageUrl) === null) {
      axios
        .get(imageUrl)
        .then(res => {
          let svgURL = res.data;
          this.setState({ svgURL });
          sessionStorage.setItem(imageUrl, svgURL);
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      let svgURL = sessionStorage.getItem(imageUrl);
      this.setState({ svgURL });
    }
  }

  render() {
    return (
      <main className="grid-container-all">
        <div className="header">
          <h1>Three seasons</h1>
        </div>
        <div className="navbar">
          <Navbar onChange={this.setTab} />
        </div>

        <Content
          svgURL={this.state.svgURL}
          poems={this.state.poems}
          audioSeason={this.state.audioSeason}
          tabId={this.state.selectedTab}
        />

        <div className="categories">
          <div className="flexCategories">
            <h2>Image</h2>
            <Category onChange={this.setImageSeason} />
            <br />
          </div>
          <div className="flexCategories">
            <h2>Text</h2>
            <Category onChange={this.setPoemSeason} /> <br />
          </div>
          <div className="flexCategories">
            <h2>Audio</h2>
            <Category onChange={this.setAudioSeason} />
          </div>
        </div>
      </main>
    );
  }

  // Sets state for season (summer, winter, autumn)
  setImageSeason(season) {
    this.setState({
      imageSeason: season
    });
    this.fetchImage(season, this.state.selectedTab);
  }

  setPoemSeason(season) {
    this.setState({
      poemSeason: season
    });
    this.fetchText(season, this.state.selectedTab);
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
    this.fetchText(this.state.poemSeason, tab);
    this.fetchImage(this.state.imageSeason, tab);
  }
}

export default App;
