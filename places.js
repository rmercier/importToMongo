var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new mongoose.Schema({
  name: {type: String, trim: true, required: true },
  phone: {type: String},
  description: {type: String},
  website: { type: String, lowercase: true, trim: true },
  type: {type: String, enum: ["restaurant","bar","museum","nightclub", "others", "theatre"], required: true},
  budget: {type: Number},
  position: {
    address:{
      street: {type: String, trim: true},
      postalCode: {type: String, trim: true},
      city: {type: String, required: false}
    },
    transportation: {
      bus: [{type: String, trim: true}],
      metro: [{type: String, trim: true}],
      parking: [{type: String, trim: true}],
      train: [{type: String, trim: true}],
    },
    gps: {
      lat: {type: Number},
      lng: {type: Number}
    },
  },
  images: [{type: String, trim: true}]
});

module.exports = mongoose.model('places', placeSchema);
