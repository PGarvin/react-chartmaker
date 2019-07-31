import React from 'react'
import { Map } from "./Map";

const condensed = require('./functions.js').condensed;
const cleanNumber = require('./functions.js').cleanNumber;
const rowObject = require('./functions.js').rowObject;
const makeArray = require('./functions.js').makeArray;
const cleanArray = require('./functions.js').cleanArray;
const percent = require('./functions.js').percent;

const Bar = ({ name, number, largest }) => {
  return (
    <div className="row">
      <div className="Name">{name}</div>
      <div
        className="Value"
        style={{ width: percent(number, largest, 60) + "%" }}>
        <span style={{ opacity: 1 }}></span>
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

class Headline extends React.Component {
  render() {
    const { headlineText } = this.props;
    return <h2>{headlineText}</h2>;
  }
}

class Intro extends React.Component {
  render() {
    const { intro } = this.props;
    return <h4>{intro}</h4>;
  }
}

class Form extends React.Component {
  render() {
  const { chart_headline, chart_intro, chart_datainput, unusable, chart_data, chart_largest, onChangeChartHeadline, onChangeChartIntro, onDataChange, onSubmit } = this.props;
    return (
      <div>
      	<h3>Let's update some cool data, shall we?</h3>
        <form onSubmit={onSubmit}>
          <div className="label-input">
            <div className="label">Please type your headline here.</div>
            <input
              className="text-input"
              type="input"
              id="headline"
              defaultValue={chart_headline}
              onChange={onChangeChartHeadline}
            />
          </div>
          <div className="label-input">
            <div className="label">Please type your intro text here.</div>
            <input
              className="text-input"
              type="input"
              id="intro"
              defaultValue={chart_intro}
              onChange={onChangeChartHeadline}
            />
          </div>
          <div className="label">Please paste your data here.</div>

          <textarea
            className="form-input"
            rows="10"
            cols="80"
            defaultValue={chart_datainput}
            onChange={onDataChange}
          />

          <div className="form-group">
            <input
              type="submit"
              value="Update chart"
              className="btn btn-primary"
            />
          </div>
        </form>

            {unusable ? (
              <div></div>
            ) : (
              <button className="btn btn-primary" onClick={this.downloadImage}>Download chart</button>
            )}

        <div className="packageHolder">
          <div className="chartHolder" id="chart">
            <Headline headlineText={chart_headline} />
            <Intro intro={chart_intro} />
            <Map />

            {unusable ? (
              <div></div>
            ) : (
              <BarChart bars={chart_data} largest={chart_largest} />
            )}
          </div>
        </div>
      </div>
    )
    }
}

export default Form;