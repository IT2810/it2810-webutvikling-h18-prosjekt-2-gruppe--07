import React, { Component } from 'react';
import summer1 from './images/summer1.jpg'; 
import winter1 from './images/winter1.jpg';
import autumn1 from './images/autumn1.jpg';
import './App.css';

const styles = {
  SVG: {
    width: 500,
  }
};

const summerPoems = ["summer1 poem", "summer2 poem", "summer3 poem"];
const winterPoems = ["winter1 poem", "winter2 poem", "winter3 poem"];
const autumnPoems = ["autumn1 poem", "autumn2 poem", "autumn3 poem"];

class App extends Component {

  constructor(props) {
    super(props);

    this.setImage = this.setImage.bind(this);
    this.setPoem = this.setPoem.bind(this);

    this.state = {
      selectedImage: summer1,
      selectedPoem: summerPoems[0],
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Seasons</h1>
        </header>
        <main>
          <ImageRadio setImage={this.setImage}/>
          <PoemRadio setPoem={this.setPoem} />
          <MediaWrapper img={this.state.selectedImage} poem={this.state.selectedPoem}/>
        </main>
        
      </div>
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
