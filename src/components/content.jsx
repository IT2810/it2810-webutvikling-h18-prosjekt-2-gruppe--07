import React, { Component } from "react";

const projectDir = "/prosjekt2";

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
      projectDir + 
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
      <div className="contentAll">
        <div
          className="contentImage"
          dangerouslySetInnerHTML={{ __html: this.props.svgURL }}
        />
        <div className="contentTextAndAudio">
          <div className="contentText">
            {this.props.poems.map(poem => (
              <span key={poem.id}>
                <h1 id="poemTitle">{poem.title}</h1>
                <p>{poem.body}</p>
                <p>{this.props.data}</p>
              </span>
            ))}
            <div className="contentAudio">
              <audio controls ref={this.audioRef}>
                <source src={this.getSourceUrl()} type="audio/mpeg" />
                Your browser does not support this element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
