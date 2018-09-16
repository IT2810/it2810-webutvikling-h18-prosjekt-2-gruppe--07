import React, { Component } from "react";

class Category extends Component {

  constructor(props) {
    super(props);

    this.handleOptionChange = this.handleOptionChange.bind(this);

    this.state = {
      selectedOption: 'summer',
    }
  }

  render() {
    return (
      <div id="controllerDiv">
        <form>
          <div className="radio">
            <label>
              <input 
                type="radio" 
                value="summer" 
                checked={this.state.selectedOption === 'summer'}
                onChange={this.handleOptionChange}/>
              Summer
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                type="radio" 
                value="autumn"
                checked={this.state.selectedOption === 'autumn'}
                onChange={this.handleOptionChange} />
              Autumn
            </label>
          </div>
          <div className="radio">
            <label>
              <input 
                type="radio" 
                value="winter"
                checked={this.state.selectedOption === 'winter'}
                onChange={this.handleOptionChange} />
              Winter
            </label>
          </div>
        </form>
      </div>
    );
  }

  handleOptionChange(changeEvent) {
    
    let value;
    

    switch(changeEvent.target.value) {
      case "summer":
        value = this.props.data['summer'][this.props.index];
        break;
      case "winter":
        value = this.props.data['winter'][this.props.index];
        break;
      case "autumn":
        value = this.props.data['autumn'][this.props.index];
        break;
    }

    console.log(value);

    this.setState({
      selectedOption: changeEvent.target.value,
    });

    this.props.onChange(value);
  }
}

export default Category;
