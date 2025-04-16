import { useState } from 'react';
import axios from 'axios';

function TodoForm({ setTodos, darkMode }) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startDate] = useState(new Date().toISOString().split('T')[0]); // Today's date

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { task, description, startDate, dueDate, completed: false };
      
      axios
        .post('http://localhost:3000/add', newTask)
        .then((response) => {
          setTodos((prevTodos) => [...prevTodos, response.data]);
          // Clear form
          setTask('');
          setDescription('');
          setDueDate('');
        })
        .catch((err) => {
          console.error('Error adding task:', err);
          alert('Failed to add task. Please try again.');
        });
    }
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg mb-6 ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}>
      <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Add New Task</h3>
      
      <div className="mb-4">
        <label htmlFor="task" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Task Name*
        </label>
        <input
          id="task"
          type="text"
          placeholder="What needs to be done?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${
            darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-300' : 'border-gray-300 placeholder-gray-400'
          }`}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Description
        </label>
        <textarea
          id="description"
          placeholder="Add details about your task (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${
            darkMode ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-300' : 'border-gray-300 placeholder-gray-400'
          }`}
          rows="3"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="dueDate" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          min={startDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${
            darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'
          }`}
        />
      </div>

      <button
        onClick={handleAddTask}
        disabled={!task.trim()}
        className={`w-full p-3 text-white rounded-lg focus:outline-none transition duration-300 ${
          task.trim() 
            ? 'bg-purple-600 hover:bg-purple-700' 
            : 'bg-purple-400 cursor-not-allowed'
        }`}
      >
        Add Task
      </button>
    </div>
  );
}

export default TodoForm;
