import { useState } from 'react';
import axios from 'axios';

// function TodoList({ todos, setTodos, darkMode }) {
//   const handleToggleCompleted = (id, currentStatus) => {
//     // axios
//     //   .patch(`http://localhost:3000/update/${id}`, { completed: !currentStatus })
//     axios.patch(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/update/${id}`, {
//         completed: !currentStatus
//       })      
//       .then((response) => {
//         setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
//       })
//       .catch((err) => {
//         console.error('Error updating task:', err);
//         alert('Failed to update task status. Please try again.');
//       });
//   };

//   const handleDeleteTask = (id) => {
//     if (window.confirm('Are you sure you want to delete this task?')) {
//         //   axios
//        // .delete(`http://localhost:3000/delete/${id}`)
//         axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/delete/${id}`)
//         .then(() => {
//           setTodos(todos.filter((todo) => todo._id !== id));
//         })
//         .catch((err) => {
//           console.error('Error deleting task:', err);
//           alert('Failed to delete task. Please try again.');
//         });
//     }
//   };
function TodoList({ todos, setTodos, darkMode }) {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  const handleToggleCompleted = (id, currentStatus) => {
    axios
      .patch(`${API_BASE_URL}/update/${id}`, { completed: !currentStatus })
      .then((response) => {
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      })
      .catch((err) => {
        console.error('Error updating task:', err);
        alert('Failed to update task status. Please try again.');
      });
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios
        .delete(`${API_BASE_URL}/delete/${id}`)
        .then(() => {
          setTodos(todos.filter((todo) => todo._id !== id));
        })
        .catch((err) => {
          console.error('Error deleting task:', err);
          alert('Failed to delete task. Please try again.');
        });
    }
  };
  // Sort todos: incomplete first, then by due date
  const sortedTodos = [...todos].sort((a, b) => {
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Then sort by due date
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    return 0;
  });
  
  return (
    <div className="space-y-4">
      {sortedTodos.length > 0 ? (
        sortedTodos.map((todo) => (
          <TodoItem 
            key={todo._id}
            todo={todo}
            onToggleComplete={handleToggleCompleted}
            onDelete={handleDeleteTask}
            darkMode={darkMode}
          />
        ))
      ) : (
        <div className={`p-8 text-center rounded-lg shadow-md ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-600'
        }`}>
          <p className="text-lg">No tasks to display!</p>
          <p className="mt-2 text-sm">Add some tasks to get started.</p>
        </div>
      )}
    </div>
  );
}

function TodoItem({ todo, onToggleComplete, onDelete, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpand = () => setIsExpanded(!isExpanded);
  
  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Calculate if task is overdue
  const isOverdue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date();
  
  return (
    <div 
      className={`rounded-lg shadow-md transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-700 text-white' 
          : todo.completed 
            ? 'bg-green-50 border-green-200' 
            : isOverdue 
              ? 'bg-red-50 border-red-200' 
              : 'bg-white border-gray-200'
      } border`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1 cursor-pointer" onClick={toggleExpand}>
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(e) => {
                e.stopPropagation();
                onToggleComplete(todo._id, todo.completed);
              }}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium truncate ${
              todo.completed 
                ? 'line-through ' + (darkMode ? 'text-gray-400' : 'text-gray-500') 
                : darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              {todo.task}
            </h3>
            
            {todo.dueDate && (
              <p className={`text-sm ${
                todo.completed 
                  ? darkMode ? 'text-gray-400' : 'text-gray-500'
                  : isOverdue
                    ? 'text-red-600 font-medium'
                    : darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Due: {formatDate(todo.dueDate)}
                {isOverdue && ' (Overdue)'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo._id);
            }}
            className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${
              darkMode 
                ? 'text-red-300 hover:bg-red-900' 
                : 'text-red-500 hover:bg-red-100'
            }`}
            aria-label="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
            </svg>
          </button>
          <button
            onClick={toggleExpand}
            className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${
              darkMode 
                ? 'text-gray-300 hover:bg-gray-600' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
            aria-label={isExpanded ? "Collapse details" : "Expand details"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'none' }}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className={`px-4 pb-4 pt-1 border-t ${
          darkMode ? 'border-gray-600' : 'border-gray-200'
        }`}>
          {todo.description ? (
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              {todo.description}
            </p>
          ) : (
            <p className={`italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No description provided
            </p>
          )}
          
          <div className={`mt-3 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p>Created: {formatDate(todo.startDate)}</p>
            {todo.completed && todo.completedDate && (
              <p>Completed: {formatDate(todo.completedDate)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;

