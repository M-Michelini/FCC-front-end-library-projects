import React, { Component } from 'react';

import Tabs from './Tabs';
import marked from 'marked';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      input:require('./initData')
    };
    this.onChange=this.onChange.bind(this);
  }
  onChange(e){
    this.setState({input:e.target.value})
  }
  render() {
    return (
      <div id='app'>
        <Tabs
          id='tab-container'
          labels={['editor','preview']}
        >
          <textarea
            id='editor'
            onChange={this.onChange}
            value={this.state.input}
          />
          <div
            id='preview'
            dangerouslySetInnerHTML={{__html:marked(this.state.input,{breaks:true})}}
          />
        </Tabs>
      </div>
    )
  }
}

export default App;
