import React, { useState } from 'react';
import axios from 'axios';

function Create({ onAdd }) {
    const [task, setTask] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

    const handleAdd = () => {
        if (!task.trim()) return;

        const newTask = { task }; // Construct the task object

        axios.post(`${API_BASE_URL}/add`, newTask)
            .then(result => {
                console.log('Task added:', result.data);
                setTask('');
                onAdd(); // Refresh list
            })
            .catch(err => {
                console.error('Error adding task:', err);
            });
    };

    return (
        <div className='create-form'>
            <input
                type='text'
                placeholder='Enter Task'
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type='button' onClick={handleAdd}>Add Task</button>
        </div>
    )
}

export default Create
