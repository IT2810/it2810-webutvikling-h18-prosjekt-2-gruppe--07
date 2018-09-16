import React, { Component } from "react";

class Category extends Component {
  render() {
    return (
      <div id="controllerDiv">
        <form>
          <div className="radio">
            <label>
              <input type="radio" value="summer" />
              Summer
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="autumn" />
              Autumn
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="winter" />
              Winter
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default Category;
