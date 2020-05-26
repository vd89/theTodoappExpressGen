const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo',{useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err) {
    throw err   
  } else {
    console.log(`Mongo DB Connected. ::ghost:...`);
  }
})