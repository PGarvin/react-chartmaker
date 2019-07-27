const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const chartRoutes = express.Router();
const path = require('path');
const PORT = 4000;

let Chart = require('./chart.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/charts', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
	console.log("Mongo DB database connection has been established successfully, my friend!");
})

chartRoutes.route('/').get(function(req, res) {
	Chart.find(function(err, charts) {
		if (err) {
			console.log(err);
		} else {
			res.json(charts);
		}
	});
});

chartRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	Chart.findById(id, function(err, chart) {
		res.json(chart);
    });
});

chartRoutes.route('/update/:id').post(function(req, res) {
	Chart.findById(req.params.id, function(err, chart) {
		if (!chart)
			res.status(404).send("data is not found, buddy");
		else
			chart.chart_headline = req.body.chart_headline;
			chart.chart_intro = req.body.chart_intro;
			chart.chart_color = req.body.chart_color;
			chart.chart_data = req.body.chart_data;
			chart.chart_datainput = req.body.chart_datainput;
			chart.chart_largest = req.body.chart_largest;
			
			chart.save().then(chart => {
				res.json('Chart updated!');
			})
			.catch(err => {
				res.status(400).send("Update isn't possible, my friend.");			
			});
	});
});
			
chartRoutes.route('/add').post(function(req, res) {
	let chart = new Chart(req.body);
	chart.save()
		.then(chart => {
			res.status(200).json({'chart': 'chart has been successfully added, buddy!'})
		})
		.catch(err => {
			res.status(400).send('sorry, adding new chart failed');
		});
});

app.use('/charts', chartRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});