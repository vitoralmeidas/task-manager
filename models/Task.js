const mongoose = require("mongoose");

//we'll set up the structure for all documents in our database
// only the fields we want to store in the database
const TaskSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

// model is a representation for the collection in the database

module.exports = mongoose.model("Task", TaskSchema);
