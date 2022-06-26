const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
// Initialize the database connection
const connectDB = require("./DB/connect");
//process.env.MONGO_URI
require("dotenv").config();

//middleware...
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});
app.use("/api/v1/tasks", tasks);

const port = 3000;

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
