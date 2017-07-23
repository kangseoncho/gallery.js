import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testState: 'testing'
    };
    //list of functions to pass down
  }
  //make functions to pass down
  render() {
    return (
      <div>
        <div>test test 123</div>
        <div>{this.state.testState}</div>
      </div>
    )
  }
}

export default App;