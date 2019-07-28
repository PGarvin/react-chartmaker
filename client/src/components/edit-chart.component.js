import React, { Component } from 'react';
import domtoimage from "dom-to-image";
import axios from 'axios';
import { Map } from "./Map";
import "./Chart.css";

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

export default class EditChart extends Component {
	constructor(props) {
		super(props);
		
		this.onChangeChartHeadline = this.onChangeChartHeadline.bind(this);
		this.onChangeChartIntro = this.onChangeChartIntro.bind(this);
		this.onChangeChartColor = this.onChangeChartColor.bind(this);
		this.onDataChange = this.onDataChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		
		this.state = {
			chart_headline: '',
			chart_intro: '',
			chart_color: '',
			chart_data: [],
			chart_datainput: '',
			chart_largest: 0
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
					chart_largest: response.data.chart_largest
				})
				console.log(this.state);
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
    console.log(this.state);
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

      for (let i = 0; i < statesData.length; i += 1) {
        //console.log(statesData[i].Name);
        for (let j = 0; j < states.length; j += 1) {
          if (
            states[j].classList.contains(
              condensed(statesData[i].Name).toLowerCase()
            )
          ) {
            let opacity = percent(
              statesData[i].Value,
              Math.max.apply(Math, valueArray),
              1
            );
            states[j].style.fill = `rgba(88,136,158,${opacity})`;
            states[j].style.stroke = "rgba(88,136,158,1)";
          }
        }
      }

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

console.log("Line 163 || "+this.state.chart_headline);
console.log("Line 164 || "+this.state.chart_intro);

      this.setState({
        unusable: true,
        chart_largest: 0,
        chart_data: data,
        chart_datainput: e.target.value
      });
      
console.log("Line 173 || "+this.state.chart_headline);
console.log("Line 174 || "+this.state.chart_intro);

    }
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

  onSubmit(e) {
    e.preventDefault();
	const obj = {
		chart_headline: this.state.chart_headline,
		chart_intro: this.state.chart_intro,
		chart_color: this.state.chart_color,
		chart_data: this.state.chart_data,
		chart_datainput: this.state.chart_datainput,
		chart_largest: this.state.chart_largest
	};
	console.log(obj);
	console.log("Line 183 || "+this.state.chart_datainput, this.state.chart_intro);
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
          <div className="label">Please paste your data here.</div>

          <textarea
            className="form-input"
            rows="10"
            cols="80"
            value={this.state.chart_datainput}
            onChange={this.onDataChange}
          />

          <div className="form-group">
            <input
              type="submit"
              value="Update chart"
              className="btn btn-primary"
            />
          </div>
        </form>

            {this.state.unusable ? (
              <div></div>
            ) : (
              <button className="btn btn-primary" onClick={this.downloadImage}>Download chart</button>
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