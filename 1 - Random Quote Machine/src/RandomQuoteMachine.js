import React, { Component } from 'react';
import axios from 'axios';
import './RandomQuoteMachine.css';
const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const transitionTypes = [
  "slide-out-left",
  "slide-out-right",
  "slide-out-up",
  "slide-out-down",
  "rotate-slow-out-shrink",
  "rotate-fast-out-shrink"
];
const fonts = [
  "shadows",
  "satisfy",
  "amatic",
  "courgette",
  "caveat",
  "cookie",
  "sacremento",
  "tangerine",
  "aronia"
];

class RandomQuoteMachine extends Component {
  constructor(props){
    super(props);
    this.state={
      quotes:[],//to be filled with quoteObjects.
      transitioning:false,//true when transitioning out.
      disabled:false,//true when transitioning out or in.

      quoteIndex:-1,//to be randomized index of quotes once quotes has a length.
      transitionIndex:Math.floor(Math.random()*transitionTypes.length),//randomized index of transitionTypes
      fontIndex:Math.floor(Math.random()*fonts.length)//randomized index of fonts
    };

    this.fetchQuotes = this.fetchQuotes.bind(this);
    this.changeQuote = this.changeQuote.bind(this);

    this.randomizeState = this.randomizeState.bind(this);
    this.triggerTransition = this.triggerTransition.bind(this)
  }
  componentWillMount(){
    this.fetchQuotes();
  }
  randomizeState(){
    this.setState({
      transitionIndex:Math.floor(Math.random()*transitionTypes.length),
      quoteIndex:Math.floor(Math.random()*this.state.quotes.length),
      fontIndex:Math.floor(Math.random()*fonts.length),
      transitioning:false
    })
  }
  triggerTransition(){
    this.setState({
      transitioning:true,
      disabled:true
    })
    setTimeout(()=>{
      this.randomizeState();
    },500)
    setTimeout(()=>this.setState({disabled:false}),1000)
  }

  fetchQuotes(){
    axios
      .get(URL)
      .then(r=>{
        this.setState({
          quotes:r.data.quotes,
          quoteIndex:Math.floor(Math.random()*r.data.quotes.length),
          transitioning:true
        });
        setTimeout(()=>this.setState({transitioning:false}))
      });
  }

  changeQuote(){
    this.triggerTransition();
  }
  render() {
    const {
      quotes,
      quoteIndex,
      transitioning,
      transitionIndex,
      fontIndex,
      disabled
    } = this.state;

    const quoteObj = quotes[quoteIndex];
    const font = fonts[fontIndex]
    const transition = transitioning?
      transitionTypes[transitionIndex]:'';

    return quotes.length ? (
      <div id="quote-box">
        <Quote
          {...quoteObj}
          font={font}
          transition={transition}
        />
        <GeneratorButtons
          {...quoteObj}
          disabled={disabled}
          handleReset={this.changeQuote}
        />
      </div>
    ) : <div>loading</div>;
  }
}

const Quote = ({
  quote,
  author,
  font,
  transition
}) => (
  <div id='transition-wrapper' className={transition}>
    <div id='text' className={font}>{quote}</div>
    <div id='author'>- {author}</div>
  </div>
);

const GeneratorButtons = ({
  quote,
  author,
  disabled,
  handleReset
}) => {
  const href = disabled ? '':
    'https://twitter.com/intent/tweet?hashtags=quotes&text='+
    encodeURIComponent('"' + quote + '" - ' + author);

  return(
    <div id='buttons-wrapper'>
      <a
        id='tweet-quote'
        href={href}
      >
        <i class="fab fa-twitter fa-3x" aria-hidden="true"></i>
      </a>
      <i id='new-quote' class="fa fa-redo fa-3x" aria-hidden="true" onClick={disabled ? ()=>{}:handleReset}></i>
    </div>
  )
}
export default RandomQuoteMachine;
