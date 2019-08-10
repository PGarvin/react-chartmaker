import React from 'react';

const percent = require('./functions.js').percent;
const commaSeparateNumber = require('./functions.js').commaSeparateNumber;

export class Bar extends React.Component {
  render() {
    const { name, number, largest, color } = this.props;
    return (
    <div className="row">
      <div className="Name">{name}</div>
      <div
        className="Value"
        style={{ width: percent(number, largest, 60) + "%"}}>
        <span style={{ background: `rgba(${color},1)`  }}></span>
      </div>
      <div className="ValueNumber">{commaSeparateNumber(number)}</div>
    </div>
  );
}
}

export class BarChart extends React.Component {
  render() {
    const { bars, largest, barColor } = this.props;
    console.log(barColor, largest);
    return (
      <div className="chartHolder">
        <div className="horizontalBarChart">
          {bars.map((bar, i) => (
            <Bar key={i} name={bar.Name} number={bar.Value} largest={largest} color={barColor}/>
          ))}
        </div>
      </div>
    );
  }
}

export class Bubble extends React.Component {
  render() {
    const { name, number, largest, color } = this.props;
    let percentage = Math.sqrt(number/largest)*100;
    let margins = Number(100 - percentage)/2;
    
    return (
<div className="bubble__holder">
<div className="Name">{name}</div>
    <div className="square" style={{width: `${percentage}%`, marginLeft:`${margins}%`}}>
            <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 400 400" enableBackground="new 0 0 400 400">
        <circle fill={`rgba(${color},1)`} cx="200" cy="200" r="199"/>
</svg>
        
            
    </div>
            <p className="Value">{commaSeparateNumber(number)}</p>
</div>
  );
}
}



export class BubbleChart extends React.Component {
  render() {
    const { bubbles, largest, bubbleColor } = this.props;
    console.log(bubbleColor, largest);
    return (
      <div className="chartHolder">
        <div className="bubbleChart">
          {bubbles.map((bubble, i) => (
            <Bubble key={i} name={bubble.Name} number={bubble.Value} largest={largest} color={bubbleColor}/>
          ))}
        </div>
      </div>
    );
  }
}

export class Chart extends React.Component {
  render() {
    const { data, bars, largest, barColor, chartType } = this.props;
	let chartContents;
	let desiredChart = chartType.split(" ").join("");
	
	if (desiredChart === "bars") {
		chartContents = <BarChart bars={data} largest={largest} barColor={barColor}/>;
	}
	if (desiredChart === "bubbles") {
		chartContents = <BubbleChart bubbles={data} largest={largest} bubbleColor={barColor}/>;
	}
    return (
		chartContents
    );
  }
}

export class Headline extends React.Component {
  render() {
    const { headlineText } = this.props;
    return <h2>{headlineText}</h2>;
  }
}

export class Intro extends React.Component {
  render() {
    const { intro } = this.props;
    return <h4>{intro}</h4>;
  }
}