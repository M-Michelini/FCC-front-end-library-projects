import React, {Component} from 'react';
import './Tabs.css';

const Tab = ({
  active,
  label,
  handleClick,
}) => (
  <div className={`tab${active?' tab-active':''}`}>
    <div onClick={handleClick} className={`tab-label${active?' tab-label-active':''}`}>{label}</div>
  </div>
)

export default class Tabs extends Component{
  constructor(props){
    super(props)
    this.state = {
      tab:1
    }
  }

  render(){
    const tabs = this.props.children.map((c,i)=>(
      <Tab
        key={i}
        active={i===this.state.tab}
        label={this.props.labels.length > i ? this.props.labels[i]:''}
        handleClick={()=>this.setState({tab:i})}
      />
    ))
    return(
      <div id={this.props.id}>
        <div className="tabs-row">
          {tabs}
        </div>
        <div className="tab-component">
          {this.props.children[this.state.tab]}
        </div>
      </div>
    )
  }
}
