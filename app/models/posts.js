var mongoose = require('mongoose');

module.exports = mongoose.model("Post", {
  title: String,
  date : Date,
  body: String
});
