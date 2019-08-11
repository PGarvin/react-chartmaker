import React, { Component } from "react";
import { Map } from "./Map";
import { Chart, Bar, BarChart, Headline, Intro } from './bar-headline-intro';
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
      chart_color: "0,93,199",
      chart_datainput: "",
      chart_data: [],
      chart_largest: 0,
      chart_type: "bars",
      chart_map: "USMap"
    };

    this.onChangeChartHeadline = this.onChangeChartHeadline.bind(this);
    this.onChangeChartIntro = this.onChangeChartIntro.bind(this);
    this.onChangeChartColor = this.onChangeChartColor.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeChartType = this.onChangeChartType.bind(this);
    this.onChangeChartMap = this.onChangeChartMap.bind(this);
  }

  onChangeChartHeadline(e) {
    this.setState({
      chart_headline: e.target.value
    });
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
    colorChange(this.state.chart_data, e.target.value);
  }

  onChangeChartType(e) {
    this.setState({
      chart_type: e.target.value
    });
  }

  onChangeChartMap(e) {
    this.setState({
      chart_map: e.target.value
      }, () => {
    colorChange(this.state.chart_data, this.state.chart_color);
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

     this.setState({
        unusable: true,
        chart_largest: largest_number,
        chart_data: data,
        chart_datainput: e.target.value
      });
    
    }
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();

	const newChart = {
		chart_headline: this.state.chart_headline,
		chart_intro: this.state.chart_intro,
		chart_color: this.state.chart_color,
		chart_data: this.state.chart_data,
		chart_datainput: this.state.chart_datainput,
		chart_largest: this.state.chart_largest,
		chart_type: this.state.chart_type,
		chart_map: this.state.chart_map
	};

	axios.post('https://evening-island-40286.herokuapp.com/charts/add', newChart)
		.then(res => console.log(res.data));

    this.setState({
      unusable: true,
      chart_headline: "This is a most delightful headline.",
      chart_intro: "This intro text is oh so lovely!",
      chart_color: "0,93,199",
      chart_datainput: "",
      chart_data: [],
      chart_largest: 0,
      chart_type: "bars",
      chart_map: "USMap"
        })		
  }

 downloadImage = require('./functions.js').downloadImage;

render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
                 <div className="label">Please paste data below; Examples of usable data can be found <a href="https://docs.google.com/spreadsheets/d/13EX9CJm0thaE5U8TCkWsSuQa4LIk6tQMrmpY4uvZNwg/edit?usp=sharing"
              target="_blank"
            >here</a></div>
                
                 <div>
                 

          <textarea
            className="form-input"
            rows="10"
            value={this.state.chart_datainput}
            onChange={this.onDataChange}
          />
        </div>
          <div className="label-input">
            <div className="label">Please type headline here</div>
            <input
              className="text-input"
              type="input"
              id="headline"
              defaultValue={this.state.chart_headline}
              onChange={this.onChangeChartHeadline}
            />
          </div>
          <div className="label-input">
            <div className="label">Please type intro text here</div>
            <input
              className="text-input"
              type="input"
              id="intro"
              defaultValue={this.state.chart_intro}
              onChange={this.onChangeChartIntro}
            />
          </div>
          <div className="selectHolder">
          <div className="label">Please select color</div>
			<select value={this.state.chart_color} onChange={this.onChangeChartColor} className="u-full-width">
			<option value="0,93,199">Blue</option>
			<option value="158,21,17">Red</option>
			<option value="222,125,11">Orange</option>
			<option value="102, 51, 153">Purple</option>
			<option value="44, 83, 0">Green</option>
			</select>
		</div> 
          <div className="selectHolder">
          <div className="label">Please select chart type</div>
			<select value={this.state.chart_type} onChange={this.onChangeChartType} className="u-full-width">
			<option value="bars">Bar chart</option>
			<option value="bubbles">Bubbles chart</option>			
			</select>
		</div> 		
          <div className="selectHolder">
          <div className="label">Please select map type</div>
			<select value={this.state.chart_map} onChange={this.onChangeChartMap} className="u-full-width">
			<option value="USMap">US map</option>
			<option value="MassachusettsMap">Massachusetts map</option>
			<option value="NoMap">No map</option>			
			</select>
		</div>		


        </form>

<div className="btn-holder">




            {this.state.unusable ? (
              <div></div>
            ) : (
            	<div>
            	<button className="btn btn-primary" onClick={this.onSubmit}>Create chart</button>
				<button className="btn btn-primary" onClick={this.downloadImage}>Download a JPEG of the chart below</button>
            </div>
            )}

</div>

        <div className="packageHolder">
          <div className="chartHolder" id="chart">
            <Headline headlineText={this.state.chart_headline} />
            <Intro intro={this.state.chart_intro} />
            <Map mapType={this.state.chart_map} />

            {this.state.unusable === true ? (
              <div></div>
            ) : (
              <Chart chartType={this.state.chart_type} data={this.state.chart_data} largest={this.state.chart_largest} barColor={this.state.chart_color}/>
            )}
          </div>
            {this.state.unusable ? (
              <div></div>
            ) : (
              <div id="coolFormToGoHere"></div>
            )}
        </div>
      </div>
    );
  }
}
