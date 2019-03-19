import React, { Component } from 'react';
import './Pomodoro.css';

const SettingTab = ({
  label,
  value,
  handle,
}) => {
  return(
    <div class={'settings-tab'}>
      <div id={label+'-label'}>{label.charAt(0).toUpperCase()+label.slice(1)} Length</div>
      <div className='tab-flex'>
        <i onClick={()=>{handle(label,-1)}} id={label+'-decrement'} class="fas fa-arrow-down arrow-ico"></i>
        <div id={label+'-length'}>{value}</div>
        <i onClick={()=>{handle(label,1)}} id={label+'-increment'} class="fas fa-arrow-up arrow-ico"></i>
      </div>
    </div>
  )
}
const TimerTab = ({
  time,
  str,
  timerType,
  startStop,
  reset
}) => {
  return(
    <div id='timer-tab'>
      <div id={'timer-label'}>{timerType}</div>
      <div id='time-left'>{str}</div>
      <div className="clock-controls">
        <i onClick={startStop} id='start_stop' class="fa fa-play clock-control"></i>
        <i onClick={reset} id='reset' class="fa fa-sync clock-control"></i>
      </div>
    </div>
  )
}
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      break:5,
      session:25,
      time:25*60,
      interval:null,
      timerType:'Session'
    }
    this.handleSetting = this.handleSetting.bind(this);
    this.getTimeStr = this.getTimeStr.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleTimerDone = this.handleTimerDone.bind(this);
    this.startStop = this.startStop.bind(this);
    this.reset = this.reset.bind(this);
    // this.startStop();
  }
  handleSetting(label,dir){
    let val = this.state[label]+dir;
    if(val>0 && val<=60){
      let update = {[label]:val}
      if(label==='session' && !this.state.interval){
        update.time = val*60
      }
      this.setState(update);
    }
  }
  getTimeStr(){
    let mm='00';
    let ss='00';
    mm+=Math.floor(this.state.time/60);
    ss+=(this.state.time%60);
    return mm.slice(mm.length-2, mm.length)+':'+ss.slice(ss.length-2, ss.length)
  }
  decrement(){
    if(this.state.time > 0)this.setState({time:this.state.time-1});
    else this.handleTimerDone();
  }
  handleTimerDone(){
    this._audio.play();
    this.setState(this.state.timerType==='Session'?{
      time:this.state.break*60,
      timerType:'Break',
    }:{
      time:this.state.session*60,
      timerType:'Session'
    });
  }
  startStop(){
    if(this.state.interval){
      this.setState({interval:clearInterval(this.state.interval)})
    }else{
      this.setState({interval:setInterval(this.decrement,1000)})
    }
  }
  reset(){
    this._audio.pause();
    this._audio.currentTime = 0;
    if(this.state.interval){
      this.startStop();
    }this.setState({
      break:5,
      session:25,
      time:25*60,
      timerType:'Session'
    });
  }
  render() {
    return (
      <div id='pomodoro-container'>
        <audio id="beep" preload="auto"
          src="https://goo.gl/65cBl1"
          ref={(audio)=>this._audio=audio}
        />
        <SettingTab
          label='break'
          value={this.state.break}
          handle={this.handleSetting}
        />
        <SettingTab
          label='session'
          value={this.state.session}
          handle={this.handleSetting}
        />
        <TimerTab
          timerType={this.state.timerType}
          time={this.state.time}
          str={this.getTimeStr()}
          startStop={this.startStop}
          reset={this.reset}
        />
      </div>
    );
  }
}

export default App;
