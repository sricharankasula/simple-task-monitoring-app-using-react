import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function ShowTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'completed' });
      updateTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleEndTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { status: 'ended' });
      updateTasks();
    } catch (error) {
      console.error('Error ending task:', error);
    }
  };

  const updateTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  };

  return (
    <div className="container table-container">
      <h2>Show Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.activity}</td>
              <td>{task.endDate}</td>
              <td>
                <span className={`status-box status-${task.status}`}>{task.status}</span>
              </td>

              <td>
                {task.status === 'inprogress' && (
                  <button className='status-completed' onClick={() => handleCompleteTask(task._id)}>Complete</button>
                )}
                {task.status === 'inprogress' && (
                  <button className='status-ended' onClick={() => handleEndTask(task._id)}>End Task</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowTasks;
