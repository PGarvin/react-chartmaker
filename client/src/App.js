import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateChart from "./components/create-chart.component";
import EditChart from "./components/edit-chart.component";
import ChartsList from "./components/charts-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
        	<nav className="navbar navbar-expand-lg navbar-light bg-light">
        		<Link to="/" className="navbar-brand">The US Map Chartmaker</Link>
        		<div className="collapse navbar-collapse">
        		<ul className="navbar-nav mr-auto">
        			<li className="navbar-item">
	        			<Link to="/" className="nav-link">Charts</Link>
    				</li>
    				<li className="navbar-item">
    					<Link to="/create" className="nav-link">Create a chart</Link>
    				</li>
    			</ul>
    			</div>
    		</nav>
    		          <h1>Use this form to make a map and chart of US data</h1>
          <h6>
            This data generates a JPEG of a map and bar chart showing how US
            states compare with one another. To try this out, paste data from an
            Excel spreadsheet, a Google Sheets document, or a CSV. When you
            paste your data into the field, this code will evaluate if the data is
            usable. If it is, you will be able to download a JPEG of your chart for you to use on your website, newsletter,
            document, etc. You'll also be able to save the chart here to edit for later use.
          </h6>
          <h6>
            Not sure if you have data that works?{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/13EX9CJm0thaE5U8TCkWsSuQa4LIk6tQMrmpY4uvZNwg/edit?usp=sharing"
              target="_blank"
            >
              Check out this link to see examples of data that works.
            </a>
          </h6>
          <h6>Feel free to paste in that data to see how it works! </h6>
    		<br/>
    		<Route path="/" exact component={ChartsList} />
    		<Route path="/edit/:id" component={EditChart} />
    		<Route path="/create" component={CreateChart} />
        </div>
      </Router>
    );
  }
}

export default App;














