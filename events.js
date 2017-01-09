var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: false },
  dateStart : {type: Date, required: false},
  dateEnd: {type: Date, required: false},
  description: {type: String, required: false},
  tag: [{type: mongoose.Schema.Types.ObjectId, ref :'Tag'}],
  place: {type: mongoose.Schema.Types.ObjectId, ref :'Place'},
  images: [{type: String, trim: true}]
});

module.exports = mongoose.model('events', eventSchema);
