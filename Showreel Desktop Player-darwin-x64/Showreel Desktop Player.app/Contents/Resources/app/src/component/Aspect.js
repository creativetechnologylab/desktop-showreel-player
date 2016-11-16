import React, { Component } from 'react';

class Aspect extends Component {
  render() {
    return <div className={"Aspect Aspect--16x9"}>
      <div className={"Aspect-content"}>
        {this.props.children}
      </div>
    </div>
  }
}

export default Aspect;
