import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function Home({ darkMode }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks when the component mounts
    setIsLoading(true);
    // axios.get('http://localhost:3000/get')
    axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/get`)
      .then((response) => {
        // Transform data to match frontend expectations
        const transformedData = response.data.map(item => ({
          _id: item._id,
          task: item.title, // Map title to task
          description: item.description,
          startDate: item.startDate,
          dueDate: item.dueDate,
          completed: item.completed,
          completedDate: item.completedDate
        }));
        setTodos(transformedData);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please refresh the page or try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className={`text-4xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Todo List
      </h1>
      
      <TodoForm setTodos={setTodos} darkMode={darkMode} />
      
      {isLoading ? (
        <div className={`p-8 text-center rounded-lg shadow-md ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-600'
        }`}>
          <p className="text-lg">Loading tasks...</p>
        </div>
      ) : error ? (
        <div className={`p-6 text-center rounded-lg shadow-md bg-red-50 text-red-600 border border-red-200`}>
          <p>{error}</p>
        </div>
      ) : (
        <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />
      )}
    </div>
  );
}

export default Home;
