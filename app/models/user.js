var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserScheme   = new Schema({
    name: String
});

module.exports = mongoose.model('User', UserScheme);