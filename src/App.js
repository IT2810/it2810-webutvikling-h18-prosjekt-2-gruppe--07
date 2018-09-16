import React, { Component } from 'react';
import summer1 from './images/summer1.jpg'; 
import winter1 from './images/winter1.jpg';
import autumn1 from './images/autumn1.jpg';
import './App.css';
import Navbar from "./components/navbar";
import Category from "./components/category";

const styles = {
  SVG: {
    width: 500,
  }
};

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

    this.setImage = this.setImage.bind(this);
    this.setPoem = this.setPoem.bind(this);

    this.state = {
      selectedImage: summer1,
      selectedPoem: summerPoems[0],
      index: 0,
    }
  }

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
          <img src={this.state.selectedImage} alt="Dette er bildet" />
        </div>
        <div className="contentText">
          {this.state.selectedPoem}
        </div>
        <div className="contentAudio">
          <audio controls>
            <source src="test.mp3" type="audio/mpeg" />
            Your browser does not support this element.
          </audio>
        </div>
        <div className="categories">
          <Category data={images} onChange={this.setImage} index={this.state.index}/> <br />
          <Category data={poems} onChange={this.setPoem} index={this.state.index}/> <br />
          <Category />
        </div>
      </main>
    );
  }
  
  setImage(image) {
    this.setState({
      selectedImage: image,
    });
  }
  setPoem(poem) {
    this.setState({
      selectedPoem: poem,
    });
  }
}

class MediaWrapper extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={this.props.img} className="SVG" alt="SVG" style={styles.SVG}/>
        </div>
        <div>
          <p>{this.props.poem}</p>
        </div>
      </div>
    );
  }
}

class ImageRadio extends Component {

  constructor(props) {
    super(props);

    this.handleOptionChange = this.handleOptionChange.bind(this);

    this.state = {
      selectedOption: "summer",
    }
  }

  render() {
    return (
      <form>
            <div className="imageRadio">
              <label>
                <p>Image category</p>
                <input type="radio" value="summer"
                checked={this.state.selectedOption === "summer"}
                onChange={this.handleOptionChange} />
                Summer
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="winter"
                checked={this.state.selectedOption === "winter"}
                onChange={this.handleOptionChange} />
                Winter
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="autumn"
                checked={this.state.selectedOption === "autumn"}
                onChange={this.handleOptionChange} />
                Autumn
              </label>
            </div>
          </form>
    );
  }

  handleOptionChange(changeEvent) {
    
    let image;
    
    switch(changeEvent.target.value) {
      case "summer":
        image = summer1;
        break;
      case "winter":
        image = winter1;
        break;
      case "autumn":
        image = autumn1;
        break;
    }
    this.setState({
      selectedOption: changeEvent.target.value,
    });

    this.props.setImage(image);
  }
}

class PoemRadio extends Component {

  constructor(props) {
    super(props);

    this.handleOptionChange = this.handleOptionChange.bind(this);

    this.state = {
      selectedOption: "summer",
    }
  }

  render() {
    return (
      <form>
            <div className="poemRadio">
              <label>
                <p>Poem category</p>
                <input type="radio" value="summer"
                checked={this.state.selectedOption === "summer"}
                onChange={this.handleOptionChange} />
                Summer
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="winter"
                checked={this.state.selectedOption === "winter"}
                onChange={this.handleOptionChange} />
                Winter
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="autumn"
                checked={this.state.selectedOption === "autumn"}
                onChange={this.handleOptionChange} />
                Autumn
              </label>
            </div>
          </form>
    );
  }

  handleOptionChange(changeEvent) {
    
    let poem;
    
    switch(changeEvent.target.value) {
      case "summer":
        poem = summerPoems[0];
        break;
      case "winter":
        poem = winterPoems[0];
        break;
      case "autumn":
        poem = autumnPoems[0];
        break;
    }
    this.setState({
      selectedOption: changeEvent.target.value,
    });

    this.props.setPoem(poem);
  }
}


export default App;
