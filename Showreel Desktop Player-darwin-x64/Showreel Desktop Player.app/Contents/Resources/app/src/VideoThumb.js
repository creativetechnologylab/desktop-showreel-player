import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

import Aspect from './component/Aspect.js';

class VideoThumb extends Component {

  constructor(props) {
    super(props);
    this.state = {playing: true};
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isPlaying != this.props.isPlaying){
      if(nextProps.isPlaying === true){
        this.playFullscreen();
      } else {
        this.stop();
      }
    }
  }

  playFullscreen(){
    this.refs['video'].play();
    this.refs['video'].fullscreen();
  }

  stop(){
    document.webkitExitFullscreen();
    this.refs['video'].seek(0);
    this.refs['video'].pause();
  }

  renderText(){
    return (
      <div className={'Video-single-title'}>
      {this.props.content.text.length > 0 && 
        <div>
          <p>{this.props.content.text[0]}</p>
          <small>{this.props.content.text[1]}</small>
        </div>
      }
      </div>
    )
  }

	render(){

    const videoBgStyle = {
       backgroundImage: `url(${this.props.content.thumb})`,
    };
  
    return (
      <div 
        key={`grid-${this.props.index}`} className={"pure-u-1-4"}>
        <div className={"Video-single"}>
          <Aspect>
            <Video 
              onClick={this.props.handleClick}
              controls
              ref={'video'}
              key={this.props.index}
              poster={`content/transparent.png`}
              onEnded={this.props.onEnd}
              onCanPlayThrough={() => {
                // Do stuff
              }}>
              <source src={this.props.content.video} type="video/mp4" />

              <div style={videoBgStyle}
                className={"video-bg"}>
              </div>
              <Fullscreen/>

            </Video>
          </Aspect>
          {this.renderText()}
        </div>
      </div>
    );

	}
}

export default VideoThumb;
