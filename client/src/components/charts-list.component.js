import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



const Chart = props => (
  <tr>
    <td>{props.chart.chart_headline}</td>
    <td>
      <Link to={"/edit/" + props.chart._id}>Edit</Link>
    </td>
  </tr>
);

export default class ChartsList extends Component {
  constructor(props) {
    super(props);
    this.state = { charts: [] };
  }

  componentDidMount() {
    axios
      .get("https://evening-island-40286.herokuapp.com/charts/")
      .then(response => {
        this.setState({ charts: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  chartList() {
    return this.state.charts.map(function(currentChart, i) {
      return <Chart chart={currentChart} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>All the cool charts</h3>
        <table className="table table-striped" style={{ marginTop: 30 }}>
          <thead>
            <tr>
              <th>Headline</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.chartList()}</tbody>
        </table>
      </div>
    );
  }
}
