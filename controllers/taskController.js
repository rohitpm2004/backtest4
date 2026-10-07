const Task = require('../models/Task');
const mongoose = require('mongoose');

// POST /api/tasks - Create a new task
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const newTask = new Task({ title, description, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks - Get all tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// GET /api/tasks/:id - Get task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/:id - Update task by ID
exports.updateTask = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    const { title, description, status } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/:id - Delete task by ID
exports.deleteTask = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid Task ID format' });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    next(err);
  }
};
