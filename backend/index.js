const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from all origins
app.use(cors());
// Parse JSON bodies
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect('mongodb+srv://kasulasricharan0508:Idkidfcare2@cluster0.uwlzil4.mongodb.net/Activity', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Task Schema
const taskSchema = new mongoose.Schema({
  activity: String,
  endDate: Date,
  status: { type: String, default: 'inprogress' }
});

const Task = mongoose.model('Task', taskSchema);

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const { activity, endDate } = req.body;
    const currentDate = new Date();
    const status = new Date(endDate) < currentDate ? 'pending' : 'inprogress'; // Calculate status
    const task = new Task({ activity, endDate, status });
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Fetch all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update task status
app.put('/api/tasks/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      const { status } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
  
      // Fetch all tasks after update and send the updated list
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not update task status' });
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
