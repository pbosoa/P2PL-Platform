var mongoose = require('mongoose');

var borrowerSchema = mongoose.Schema({
  name: {type: String},
  age: {type: Number},
  location: {type: [Number]},
  creditScore: {type: Number}
});

borrowerSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Borrower', borrowerSchema);