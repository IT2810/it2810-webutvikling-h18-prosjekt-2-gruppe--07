import React, { Component } from "react";
import "../styles/navbar.css";

class Navbar extends Component {
  state = {};

  render() {
    return (
      <div className="topnav" id="topnav">
        <button onClick={() => this.props.onChange(0)}>Display I</button>
        <button onClick={() => this.props.onChange(1)}>Display II</button>
        <button onClick={() => this.props.onChange(2)}>Display III</button>
        <button onClick={() => this.props.onChange(3)}>Display IV</button>
      </div>
    );
  }
}

export default Navbar;
