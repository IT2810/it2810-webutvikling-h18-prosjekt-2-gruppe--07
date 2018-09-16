import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Category from "./components/category";

class App extends Component {
  render() {
    return (
      <main className="grid-container-all">
        <div className="title">
          <h1>Kunstutstilling</h1>
        </div>
        <div className="navbar" id="navbar">
          <Navbar />
        </div>
        <div className="contentImage">
          <img src="bla.png" alt="Dette er bildet" />
        </div>
        <div className="contentText" />
        <div className="contentAudio">
          <audio controls>
            <source src="test.mp3" type="audio/mpeg" />
            Your browser does not support this element.
          </audio>
        </div>
        <div className="categories">
          <Category /> <br />
          <Category /> <br />
          <Category />
        </div>
      </main>
    );
  }
}

export default App;
