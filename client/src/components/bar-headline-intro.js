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