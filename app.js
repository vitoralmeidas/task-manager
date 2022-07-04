const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
// Initialize the database connection
const connectDB = require("./DB/connect");
//process.env.MONGO_URI
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware...
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

//  app.get('/api/v1/tasks')     - get all the tasks
//  app.get('/api/v1/tasks')     - create a new task
//  app.get('/api/v1/tasks/:id') - get single task
//  app.get('/api/v1/tasks/:id') - update task
//  app.get('/api/v1/tasks/:id') -delete task

const port = process.env.PORT || 3000;

// connect to the database
// start the server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
