const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  // Find it in the database
  const task = await Task.findOne({ _id: taskID });
  // always use return in if statments: without it, we'll send the status and flow will continue
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  // add the object options to keep the task that will be send
  //update in the response to patch and get all
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    //the options that we set to each model's schema
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};

/*

  PUT: we pass what we want to update, but the rest of the properties will be REMOVED
  PATCH: we passa what we want to update, the rest of the properties will CONTINUE with the last value

*/
