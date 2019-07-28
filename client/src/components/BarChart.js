import React, { Component } from 'react';

const percent = (number, largest, percentage) => {
  return (percentage * number) / largest;
};

const Bar = ({ name, number, largest }) => {
  return (
    <div className="row">
      <div className="Name">{name}</div>
      <div
        className="Value"
        style={{ width: percent(number, largest, 60) + "%" }}
      >
        <span style={{ opacity: percent(number, largest, 1) }}></span>
      </div>
      <div className="ValueNumber">{number}</div>
    </div>
  );
};

class BarChart extends React.Component {
  render() {
    const { bars, largest } = this.props;
    return (
      <div className="chartHolder">
        <div className="horizontalBarChart">
          {bars.map((bar, i) => (
            <Bar key={i} name={bar.Name} number={bar.Value} largest={largest} />
          ))}
        </div>
      </div>
    );
  }
}

export default BarChart;