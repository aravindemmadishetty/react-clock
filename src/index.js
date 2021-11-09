import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function calculateAngle(interval){
  const current = new Date();
  if(interval === 1){
    return (360/60)*current.getSeconds();
  }

  if(interval === 60){
    return (360/3600)*current.getSeconds() + (360/60)*current.getMinutes();
  }

  if(interval === 3600){
    return (360/(3600*12))*current.getSeconds() + (360/(60*12))*current.getMinutes() + (360/12)*current.getHours();
  }
}

class Hand extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      current: calculateAngle(this.props.interval),
    }
    this.styles = {
      transform : "rotate(" + this.state.current+ ")",
    }
  }

  componentDidMount(){
    this.timerID = setInterval( ()=> this.tick() , 1000);
    console.log(this.state.current)
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    console.log(this.state.current)
    this.setState({
      current: calculateAngle(this.props.interval),
    })
    this.styles = {
      transform : "rotate(" + this.state.current + "deg)",
    }
  }

  render(){
    return (
      <div className = {this.props.hand + " clock-hand"} style = {this.styles}></div>
    )
  }
}

class Hands extends React.Component{
  render(){
    return(
      <div className = "clock-circle">
        <Hand interval = {1} hand = "seconds-hand"/>
        <Hand interval = {60} hand = "minutes-hand"/>
        <Hand interval = {3600} hand = "hours-hand"/>
      </div>
    )
    
  }
}

class CurrentDate extends React.Component{
  render(){
    const date = new Date().toDateString();
    return(
      <div className = "current-date">
        <p>{date}</p>
      </div>
    )
  }
}

function Clock(props){
  return(
    <div className = "clock">
      <Hands />
      <CurrentDate />
    </div>
  )
}

ReactDOM.render(<Clock />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
