import React, { useState } from 'react';
import axios from 'axios'; // Import Axios library
import '../App.css';

function AddTasks() {
  const [activity, setActivity] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        activity,
        endDate
      });

      console.log(response.data); // Log the response data
      alert("Task submitted")
      setActivity('');
      setEndDate('');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <div className="container form-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="activity">Activity:</label><br />
        <input
          type="text"
          id="activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        /><br />

        <label htmlFor="endDate">End Date:</label><br />
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        /><br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTasks;