import React, { Component } from "react";

export default class Content extends Component {
  constructor(props) {
    super(props);

    this.audioRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    // Get audio element to re-load
    this.audioRef.current.pause();
    this.audioRef.current.load();
  }
  // Get source url for audio
  getSourceUrl() {
    return (
      "/audio/" +
      this.props.audioSeason +
      "/" +
      this.props.audioSeason +
      this.props.tabId +
      ".mp3"
    );
  }

  render() {
    return (
      <div>
        <div className="contentText">
          {this.props.poems.map(poem => (
            <span key={poem.id}>
              <h1>{poem.title}</h1>
              <p>{poem.body}</p>
              <p>{this.props.data}</p>
            </span>
          ))}
        </div>
        <div className="contentAudio">
          <audio controls autoPlay ref={this.audioRef}>
            <source src={this.getSourceUrl()} type="audio/mpeg" />
            Your browser does not support this element.
          </audio>
        </div>
      </div>
    );
  }
}
