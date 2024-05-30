// models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['In Progress', 'Complete'],
    default: 'In Progress'
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
