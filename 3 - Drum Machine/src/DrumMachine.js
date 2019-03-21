import React, { Component } from 'react';

import AUDIO_DATA from './AUDIO_DATA.json';
import MyAudioObject from './MyAudioObject.js'
import './DrumMachine.css';

const DrumPads = ({
  play,
  addAudioRef,
  keys
}) => {
  const drumPads = AUDIO_DATA.map((audioref,i)=>(
    <div
      key={i}
      id={audioref.label}
      onMouseDown={()=>play(audioref.label)}
      className={`drum-pad${keys.includes(audioref.key)?' drum-pad-active':''}`}
    >
      <span>{audioref.label}</span>
      <span>{audioref.key}</span>
    </div>
  ));
  return <div id='drum-pads'>{drumPads}</div>
}

class DrumMachine extends Component {
  constructor(props){
    super(props);

    this.state={
      loading:true,
      keys:[]
    }

    this.audio = new MyAudioObject(AUDIO_DATA);

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyRelease = this.handleKeyRelease.bind(this)
  }
  componentWillMount(){
    this.audio.loadAudioFiles(()=>this.setState({loading:false}))
    window.addEventListener('keydown',this.handleKeyPress)
    window.addEventListener('keyup',this.handleKeyRelease)
  }

  handleKeyRelease(e){
    this.setState({keys:this.state.keys.filter(k=>k!==e.code[3])});
  }
  handleKeyPress(e){
    const ref = AUDIO_DATA.find(ref=>ref.key===e.code[3]&&!this.state.keys.includes(ref.key));
    if(ref){
      this.setState({keys:[...this.state.keys,ref.key]})
      this.audio.play(ref.label);
    }
  }
  render() {
    return (
      this.state.loading ?
        <div>LOADING</div>:
        <DrumPads
          keys={this.state.keys}
          play={ref=>this.audio.play(ref)}
        />
    );
  }
}

export default DrumMachine;
