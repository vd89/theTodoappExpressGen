const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  item : String
})

module.exports = mongoose.model('todo',TodoSchema,'todos')
