import React, { Component } from "react";
import "../styles/navbar.css";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <div className="topnav" id="topnav">
        <div className="navbox">
          <a href="#">Kombo 1</a>
          <a href="#">Kombo 2</a>
          <a href="#">Kombo 3</a>
          <a href="#">Kombo 4</a>
        </div>
      </div>
    );
  }
}

export default Navbar;
