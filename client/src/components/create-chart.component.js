import React, { Component } from "react";
import { Map } from "./Map";
import { Bar, BarChart, Headline, Intro } from './bar-headline-intro';
import "./Chart.css";
import domtoimage from "dom-to-image";
import axios from 'axios';

const condensed = require('./functions.js').condensed;
const commaSeparateNumber = require('./functions.js').commaSeparateNumber;
const cleanNumber = require('./functions.js').cleanNumber;
const rowObject = require('./functions.js').rowObject;
const makeArray = require('./functions.js').makeArray;
const cleanArray = require('./functions.js').cleanArray;
const percent = require('./functions.js').percent;
const colorChange = require('./functions.js').colorChange;

export default class CreateChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unusable: true,
      chart_headline: "This is a most delightful headline.",
      chart_intro: "This intro text is oh so lovely!",
      chart_color: "88,136,158",
      chart_datainput: "",
      chart_data: [],
      chart_largest: 0
    };

    this.onChangeChartHeadline = this.onChangeChartHeadline.bind(this);
    this.onChangeChartIntro = this.onChangeChartIntro.bind(this);
    this.onChangeChartColor = this.onChangeChartColor.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeChartHeadline(e) {
    this.setState({
      chart_headline: e.target.value
    });
    console.log(condensed("I am testing MY CODE"));
  }

  onChangeChartIntro(e) {
    this.setState({
      chart_intro: e.target.value
    });
  }

  onChangeChartColor(e) {
    this.setState({
      chart_color: e.target.value
    });
  }

  onDataChange(e) {
    const states = document.querySelectorAll(".state");
    let unusability;
    let input = e.target.value;
    let initialArray = makeArray(input);
    let data = cleanArray(initialArray);
    let valueArray = data.map(function(datum) {
      return Number(datum.Value);
    });
	let largest_number = Math.max.apply(Math, valueArray);
	console.log(largest_number);

    if (data.length >= 2) {
      const statesData = Object.keys(data).map(function(key) {
        return data[key];
      });

      colorChange(statesData, this.state.chart_color);

      this.setState({
        unusable: false,
        chart_largest: largest_number,
        chart_data: statesData,
        chart_datainput: e.target.value
      });
      console.log(this.state.chart_largest, Math.max.apply(Math, valueArray));
    } else {
      for (let j = 0; j < states.length; j += 1) {
        states[j].style.fill = "#EEE";
        states[j].style.stroke = "#AAA";
      }

console.log("Line 145 || "+this.state.chart_headline);
console.log("Line 145 || "+this.state.chart_intro);

     this.setState({
        unusable: true,
        chart_largest: largest_number,
        chart_data: data,
        chart_datainput: e.target.value
      });
    
console.log("Line 155 || "+this.state.chart_headline);
console.log("Line 156 || "+this.state.chart_intro);

    }
  }

  onSubmit(e) {
    e.preventDefault();

	const newChart = {
		chart_headline: this.state.chart_headline,
		chart_intro: this.state.chart_intro,
		chart_color: this.state.chart_color,
		chart_data: this.state.chart_data,
		chart_datainput: this.state.chart_datainput,
		chart_largest: this.state.chart_largest
	};

	axios.post('https://evening-island-40286.herokuapp.com/charts/add', newChart)
		.then(res => console.log(res.data));

    this.setState({
      unusable: true,
      chart_headline: "This is a most delightful headline.",
      chart_intro: "This intro text is oh so lovely!",
      chart_color: "88,136,158",
      chart_datainput: "",
      chart_data: [],
      chart_largest: 0
        })		
  }

  downloadImage() {
        domtoimage
        .toJpeg(document.getElementById("chart"), { quality: 1 })
        .then(function(dataUrl) {
          var link = document.createElement("a");
          link.download = "map-chart.jpeg";
          link.href = dataUrl;
          link.click();
        });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="label-input">
            <div className="label">Please type your headline here.</div>
            <input
              className="text-input"
              type="input"
              defaultValue="Headline goes here."
              id="headline"
              defaultValue={this.state.chart_headline}
              onChange={this.onChangeChartHeadline}
            />
          </div>
          <div className="label-input">
            <div className="label">Please type your intro text here.</div>
            <input
              className="text-input"
              type="input"
              defaultValue="This is great intro text."
              id="intro"
              defaultValue={this.state.chart_intro}
              onChange={this.onChangeChartIntro}
            />
          </div>
          <div className="label">Please paste your data here.</div>

          <textarea
            className="form-input"
            rows="10"
            value={this.state.chart_datainput}
            onChange={this.onDataChange}
          />

          <div className="form-group">
            <input
              type="submit"
              value="Create Chart"
              className="btn btn-primary"
            />
          </div>
        </form>

            {this.state.unusable ? (
              <div></div>
            ) : (
				<button className="btn btn-primary" onClick={this.downloadImage}>Download a JPEG of the chart below</button>
            )}

        <div className="packageHolder">
          <div className="chartHolder" id="chart">
            <Headline headlineText={this.state.chart_headline} />
            <Intro intro={this.state.chart_intro} />
            <Map />

            {this.state.unusable ? (
              <div></div>
            ) : (
              <BarChart bars={this.state.chart_data} largest={this.state.chart_largest} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
