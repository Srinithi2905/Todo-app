import React from 'react'
import axios from 'axios'
import { FaCheckCircle, FaTrashAlt, FaClock, FaCheck } from 'react-icons/fa'

function TodoItem({ todo, onUpdate }) {
  const handleDelete = () => {
    // axios.delete(`http://localhost:3000/delete/${todo._id}`)
    axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/delete/${todo._id}`)
      .then(() => onUpdate())
      .catch(err => console.log(err))
  }

  const handleComplete = () => {
    // axios.put(`http://localhost:3000/complete/${todo._id}`)
    axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:3000'}/complete/${todo._id}`)
      .then(() => onUpdate())
      .catch(err => console.log(err))
  }

  return (
    <tr className="border-t text-sm">
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{new Date(todo.startDate).toLocaleDateString()}</td>
      <td>{new Date(todo.dueDate).toLocaleDateString()}</td>
      <td className="text-center">
        {todo.completed ? (
          <span className="text-green-600 flex items-center gap-1"><FaCheck /> Done</span>
        ) : (
          <span className="text-yellow-600 flex items-center gap-1"><FaClock /> Pending</span>
        )}
      </td>
      <td>{todo.completedDate ? new Date(todo.completedDate).toLocaleDateString() : '—'}</td>
      <td className="space-x-2">
        {!todo.completed && (
          <button onClick={handleComplete} className="text-green-600 hover:underline flex items-center gap-1">
            <FaCheckCircle /> Complete
          </button>
        )}
        <button onClick={handleDelete} className="text-red-600 hover:underline flex items-center gap-1">
          <FaTrashAlt /> Delete
        </button>
      </td>
    </tr>
  )
}

export default TodoItem
