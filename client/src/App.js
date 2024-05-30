// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AddTasks from './components/AddTasks';
import ShowTasks from './components/ShowTasks';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <ul className='navbar ul'>
            <li className='navbar ul li'>
              <Link className='link' to="/add-task">Add Task</Link>
            </li>
            <li className='navbar ul li'>
              <Link className='link'to="/show-tasks">Show Tasks</Link>
            </li>
          </ul>
        </div>

        <Routes>
          <Route path="/add-task" element={<AddTasks />} />
          <Route path="/show-tasks" element={<ShowTasks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
