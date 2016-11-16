import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { default as Video, Controls, Play, Mute, Seek, Fullscreen, Time, Overlay } from 'react-html5video';

import 'react-html5video/dist/ReactHtml5Video.css';
import 'purecss/build/pure-min.css';
import './App.css';

import VideoThumb from './VideoThumb.js';

// Dummy content for testing.
// const videos = ['public/content/1/video.mp4', 'public/content/2/video.mp4', 'public/content/3/video.mp4', 'public/content/4/video.mp4', 'public/content/5/video.mp4', 'public/content/6/video.mp4', 'public/content/7/video.mp4', 'public/content/8/video.mp4', 'public/content/9/video.mp4', 'public/content/10/video.mp4', 'public/content/11/video.mp4', 'public/content/12/video.mp4'];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {currentVideo: -1};
  }

  playVideo(index){
    index = index%this.props.videos.length;
    this.setState({ currentVideo: index });
  }

  renderVideos(){

    return (
      this.props.videos.map((obj, index) => {
        var c = obj[1];
        var content = { video: c[1], thumb: c[0], text: c[2] };
        return <VideoThumb 
          key={index}
          handleClick={this.playVideo.bind(this, index)}
          onEnd={this.playVideo.bind(this, index+1)}
          isPlaying={this.state.currentVideo === index}
          index={index} 
          content={content} />;
      })
    )
  }

  render() {
    const videoClass = classNames('Video', 'pure-g');
    return (
      <div className="App">
        <div className={videoClass}>
          {this.renderVideos()}
        </div>
     </div>
    );
  }
}

export default App;
