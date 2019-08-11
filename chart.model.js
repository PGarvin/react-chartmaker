const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Chart = new Schema({
	chart_headline: {
		type: String
	},
	chart_intro: {
		type: String
	},
	chart_color: {
		type: String
	},
	chart_datainput: {
		type: String
	},
	chart_data: {
		type: Array
	},
	chart_largest: {
		type: Number
	},
	chart_type: {
		type: String
	},
	chart_map: {
		type: String
	}
});

module.exports = mongoose.model('Chart', Chart);