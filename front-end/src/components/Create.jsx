import React, { useState } from 'react'
import axios from 'axios'

function Create({ onAdd }) {
    const [task, setTask] = useState('')

    const handleAdd = () => {
        if (!task) return; // prevent empty task
        axios.post('http://localhost:3000/add', { task })
            .then(result => {
                console.log(result)
                setTask('')        
                onAdd()            // refresh list
            })
            .catch(err => console.log(err))
    }

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
