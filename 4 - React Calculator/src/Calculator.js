/* eslint no-eval: 0 */
import React, { Component } from 'react';
import './Calculator.css';
const numbers = ['zero','one','two','three','four','five','six','seven','eight','nine'];
const Effectors = ({handle}) => (
  <div className='num-row'>
    <button onClick={handle} id='clear' className='num-btn'>AC</button>
    <button onClick={handle} id='opposite' className='num-btn'>+/-</button>
    <button onClick={handle} id='percent' className='num-btn'>%</button>
  </div>
);
const Operators = ({handle}) => (
  <div className='operator-group'>
    <button onClick={handle} id='divide' className='num-btn operator'>/</button>
    <button onClick={handle} id='multiply' className='num-btn operator'>*</button>
    <button onClick={handle} id='subtract' className='num-btn operator'>-</button>
    <button onClick={handle} id='add' className='num-btn operator'>+</button>
    <button onClick={handle} id='equals' className='num-btn operator'>=</button>
  </div>
)
const NumPad = ({handle}) => {
  const numpad = [
    <button key='decimal' onClick={handle} id='decimal' className='num-btn'>.</button>,
    ...new Array(10).fill().map((_,i)=>
      <button onClick={handle} key={i} id={numbers[i]} className='num-btn'>
        {i}
      </button>)
  ];
  return(
    <div className='num-row'>
      {numpad}
    </div>
  );
};
const KeyPad = ({handle}) => (
  <div style={{
    display:'flex',
  }}>
    <div style={{
      display:'flex',
      flexDirection:'column',
      width:'75%'
    }}>
      <Effectors handle={handle.effect} />
      <NumPad handle={handle.num}/>
    </div>
    <Operators handle={handle.operator}/>
  </div>
);

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      equation: [],
      value: '',
      answer: ''
    };
    this.evaluateState = this.evaluateState.bind(this);

    this.handleNum = this.handleNum.bind(this);
    this.handleEffect = this.handleEffect.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }
  evaluateState(){
    const {value,equation} = this.state;
    let out = value!=='' ?
      equation.join('')+this.state.value:
      equation.slice(0,equation.length-1).join('');
    console.log(out)
    out=eval(out).toString();
    this.setState({value:'',equation:[],answer:out})
  }
  handleNum(e){
    var isNumber = numbers.includes(e.target.id);
    var isDecimal = this.state.value.includes('.');
    if (isNumber) {
      let num = e.target.innerHTML;
      this.setState({value:isDecimal ? this.state.value+num:Number(this.state.value+num).toString()})
    }else{
      if(this.state.value==='') this.setState({value:'0.'})
      else if(!isDecimal) this.setState({value:this.state.value+'.'});

    }
  }
  handleOperator(e){
    const {equation,answer}=this.state;
    if(e.target.innerHTML==='='){this.evaluateState()}
    else if(this.state.value!=='')this.setState({value:'',equation:[...this.state.equation,this.state.value,e.target.innerHTML]})
    else{
      if(!equation.length>0){
        if(answer!==''){
          equation.push(answer)
          equation.push(e.target.innerHTML);
        }
      }else{
        equation.pop();
        equation.push(e.target.innerHTML);
      }
      this.setState({equation});
    }
  }
  handleEffect(e){
    const {value,answer} = this.state
    switch(e.target.id){
      case 'clear':
        this.setState({value:'',equation:[],answer:''});
        break;
      case 'opposite':
        if(value===''&&answer!==''){
          this.setState({value:answer.slice(0,1)==='-'?answer.slice(1):'-'+answer});
        }else{
          this.setState({value:value.slice(0,1)==='-'?value.slice(1):'-'+value});
        }
        break;
      case 'percent':
        this.setState({value:(Number(value)/100).toString()});
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div id='calculator'>
        <div id='display'>
          <div id='display-equation'>
            {this.state.equation.join(' ')+' '+this.state.value}
          </div>
          <div id='answer'>
            {this.state.answer}
          </div>
        </div>
        <KeyPad
          handle={{
            num:this.handleNum,
            operator:this.handleOperator,
            effect:this.handleEffect
          }}
        />
      </div>
    );
  }
}

export default Calculator;
