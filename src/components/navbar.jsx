import React, { Component } from "react";
import "../styles/navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="topnav" id="topnav">
        <div className="navbox">
          <button onClick={() => this.props.onChange(0)}>Kombo 1</button>
          <button onClick={() => this.props.onChange(1)}>Kombo 2</button>
          <button onClick={() => this.props.onChange(2)}>Kombo 3</button>
          <button onClick={() => this.props.onChange(3)}>Kombo 4</button>
        </div>
      </div>
    );
  }

  

}

export default Navbar;
