const mongoose = require("mongoose");

//we'll set up the structure for all documents in our database
// only the fields we want to store in the database
//everthing more, it'll be ignored
const TaskSchema = new mongoose.Schema({
  name: {
    // simple validation
    type: String,
    required: [true, "must provide name"],
    trim: true,
    minlength: [3, "name must be at least 3 characters"],
    maxlength: [20, "name must be at most 30 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// model is a representation for the collection in the database
module.exports = mongoose.model("Task", TaskSchema);
