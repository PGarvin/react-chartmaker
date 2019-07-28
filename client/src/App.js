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














