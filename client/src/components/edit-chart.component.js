import React, { Component } from 'react';
import axios from 'axios';
import { Chart, Bar, BarChart, Headline, Intro } from './bar-headline-intro';
import { Map } from './Map';
import './Chart.css';

const condensed = require('./functions.js').condensed;
const commaSeparateNumber = require('./functions.js').commaSeparateNumber;
const cleanNumber = require('./functions.js').cleanNumber;
const rowObject = require('./functions.js').rowObject;
const makeArray = require('./functions.js').makeArray;
const cleanArray = require('./functions.js').cleanArray;
const percent = require('./functions.js').percent;
const colorChange = require('./functions.js').colorChange;


export default class EditChart extends Component {
	constructor(props) {
		super(props);
		
    this.onChangeChartHeadline = this.onChangeChartHeadline.bind(this);
    this.onChangeChartIntro = this.onChangeChartIntro.bind(this);
    this.onChangeChartColor = this.onChangeChartColor.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeChartType = this.onChangeChartType.bind(this);
		
		this.state = {
			chart_headline: '',
			chart_intro: '',
			chart_color: '',
			chart_data: [],
			chart_datainput: '',
			chart_largest: 0,
			chart_type: "bars"
		}
	}
	
	componentDidMount() {
		axios.get('https://evening-island-40286.herokuapp.com/charts/'+this.props.match.params.id)
			.then(response => {
				this.setState({
					chart_headline: response.data.chart_headline,
					chart_intro: response.data.chart_intro,
					chart_color: response.data.chart_color,
					chart_data: response.data.chart_data,
					chart_datainput: response.data.chart_datainput,
					chart_largest: response.data.chart_largest,
					chart_type: response.data.chart_type
				})
				console.log(this.state);
				colorChange(this.state.chart_data, this.state.chart_color);
			})
			.catch(function (error) {
				console.log(error);
				console.log("The error is coming from line 88 in edit-chart.component.js");
			})
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
    console.log(this.state);
  }

  onChangeChartColor(e) {
    this.setState({
      chart_color: e.target.value
    });
    colorChange(this.state.chart_data, e.target.value);
  }

  onChangeChartType(e) {
  	console.log(this.state.chart_type, e.target.value);
    this.setState({
      chart_type: e.target.value
    });
    console.log(this.state.chart_type, e.target.value);
  }

  onDataChange(e) {
    const states = document.querySelectorAll(".state");
    let unusability;
    let largest_number = "";
    let input = e.target.value;
    let initialArray = makeArray(input);
    let data = cleanArray(initialArray);
    let valueArray = data.map(function(datum) {
      return Number(datum.Value);
    });

    if (data.length >= 2) {
      const statesData = Object.keys(data).map(function(key) {
        return data[key];
      });

      colorChange(statesData, this.state.chart_color);


      this.setState({
        unusable: false,
        chart_largest: Math.max.apply(Math, valueArray),
        chart_data: statesData,
        chart_datainput: e.target.value
      });
    } else {
      for (let j = 0; j < states.length; j += 1) {
        states[j].style.fill = "#EEE";
        states[j].style.stroke = "#AAA";
      }

      this.setState({
        unusable: true,
        chart_largest: 0,
        chart_data: data,
        chart_datainput: e.target.value
      });
      

    }
  
  console.log(document.getElementById('chart').innerHTML.split('><').join('>\n<'));
  }

  downloadImage = require('./functions.js').downloadImage;

  onSubmit(e) {
    e.preventDefault();
	const obj = {
		chart_headline: this.state.chart_headline,
		chart_intro: this.state.chart_intro,
		chart_color: this.state.chart_color,
		chart_data: this.state.chart_data,
		chart_datainput: this.state.chart_datainput,
		chart_largest: this.state.chart_largest,
		chart_type: this.state.chart_type
	};
	axios.post('https://evening-island-40286.herokuapp.com/charts/update/'+this.props.match.params.id, obj)
		.then(res => console.log(res.data));

	this.props.history.push('/');	
  }
	
	
  render() {
    return (
      <div>
      <h3>Let's update some cool data, shall we?</h3>
        <form onSubmit={this.onSubmit}>
          <div className="label-input">
            <div className="label">Please type your headline here.</div>
            <input
              className="text-input"
              type="input"
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
              id="intro"
              defaultValue={this.state.chart_intro}
              onChange={this.onChangeChartIntro}
            />
          </div>
          <div className="selectHolder">
          <div className="label">Please select your color</div>
			<select value={this.state.chart_color} onChange={this.onChangeChartColor} className="u-full-width">
			<option value="0,93,199">Blue</option>
			<option value="158,21,17">Red</option>
			<option value="222,125,11">Orange</option>
			<option value="102, 51, 153">Purple</option>
			<option value="44, 83, 0">Green</option>
			</select>
		</div> 
          <div className="selectHolder">
          <div className="label">Please select your chart type</div>
			<select value={this.state.chart_type} onChange={this.onChangeChartType} className="u-full-width">
			<option value="bars">Bar chart</option>
			<option value="bubbles">Bubbles chart</option>			
			</select>
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
              value="Create chart"
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