var fs = require('fs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//CONNECTION TO REAL DATABASE

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://sailadmin:Sail2017@ds023448.mlab.com:23448/saildb';
mongoose.connect(mongodbUri, options);


//TEST TO LOCAL Host

/*
mongoose.connect('mongodb://localhost:27017/import');
*/
var db = mongoose.connection;


//Schema
var Place  = require('./places.js');
var Event = require('./events.js')


//Read File
var content = readFile('results.json');
var theatre_json = JSON.parse(content);

//Objects Number
console.log("FILE objects length : " + theatre_json.length );

//Places events creations

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log('bdd open');
/*  theatre_json.forEach(function(obj) {
      insertPlaceAndEvent(obj);
  }, db.close());*/

  async = require("async");
  async.each(theatre_json, function(item, callback){
      // Call an asynchronous function, often a save() to DB
      insertPlaceAndEvent(item);
      // Async call is done, alert via callback
      callback();
  },
  // 3rd param is the function to call when everything's done
  function(err){
    // All tasks are done now
    //db.close();
  });
});

function insertPlaceAndEvent(data) {
  console.log('insert');

  delete data['image_urls'];

  var image = data['images'][0]['path'];

  delete data['images'];
  data['images'] = image;

  data['type'] = data['mtype']
  delete data['mtype']

  //Get Places Events
  var events = data['events'];
  //Remove events of places
  delete data['events'];
  //Create place
  var place = new Place(data);

  //Save places and associated events with place ID
  place.save(function (err) {
    if (err) return console.log(err);
    //Loop Througt Event
    if(events != null) {
      events.forEach(function(obj) {
        delete obj['image_urls'];
        var image = obj['images']['path'];
        delete obj['images'];
        obj['images'] = image;

        obj['place'] = place._id;
        var data_event = new Event(obj);
        data_event.save(function (err) {
          if (err) return console.log(err);
        });
      });

    }

  });

}



/* Functions
*/

function readFile(title) {
  return contents = fs.readFileSync(title, 'utf8');
}
