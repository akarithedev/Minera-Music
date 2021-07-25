const mongoose = require('mongoose');

const Guild = mongoose.Schema({
      prefix: String,
      guildName: String,
      guildID: String
 
});

module.exports = mongoose.model('Guild', Guild); 