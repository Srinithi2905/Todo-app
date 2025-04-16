

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Models');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://smiley:srinithi%4029@cluster0.0bple.mongodb.net/test')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error:', err));

// Get all todos
app.get('/get', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});

// Create todo
app.post('/add', (req, res) => {
    const { task, description, startDate, dueDate, completed } = req.body;

    TodoModel.create({
        title: task, // Map task to title
        description,
        startDate: new Date(startDate),
        dueDate: dueDate ? new Date(dueDate) : null,
        completed: completed || false
    })
    .then(result => {
        // Transform result to match frontend expectations
        const transformedResult = {
            _id: result._id,
            task: result.title,
            description: result.description,
            startDate: result.startDate,
            dueDate: result.dueDate,
            completed: result.completed,
            completedDate: result.completedDate
        };
        res.json(transformedResult);
    })
    .catch(err => {
        console.error('Error creating todo:', err);
        res.status(500).json(err);
    });
});

// Toggle completion status (PATCH)
app.patch('/update/:id', (req, res) => {
    const { completed } = req.body;
    const updateData = { 
        completed: completed
    };
    
    // If marking as completed, set completedDate
    if (completed === true) {
        updateData.completedDate = new Date();
    }
    
    TodoModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
    )
    .then(result => {
        // Transform result to match frontend expectations
        const transformedResult = {
            _id: result._id,
            task: result.title,
            description: result.description,
            startDate: result.startDate,
            dueDate: result.dueDate,
            completed: result.completed,
            completedDate: result.completedDate
        };
        res.json(transformedResult);
    })
    .catch(err => {
        console.error('Error updating todo:', err);
        res.status(500).json(err);
    });
});

// Delete todo
app.delete('/delete/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
        .then(result => res.json({ message: 'Deleted', result }))
        .catch(err => {
            console.error('Error deleting todo:', err);
            res.status(500).json(err);
        });
});

// Update todo details
app.put('/update/:id', (req, res) => {
    const { task, description, startDate, dueDate } = req.body;
    
    TodoModel.findByIdAndUpdate(
        req.params.id,
        { 
            title: task,
            description, 
            startDate: startDate ? new Date(startDate) : undefined, 
            dueDate: dueDate ? new Date(dueDate) : undefined 
        },
        { new: true }
    )
    .then(result => {
        // Transform result to match frontend expectations
        const transformedResult = {
            _id: result._id,
            task: result.title,
            description: result.description,
            startDate: result.startDate,
            dueDate: result.dueDate,
            completed: result.completed,
            completedDate: result.completedDate
        };
        res.json(transformedResult);
    })
    .catch(err => {
        console.error('Error updating todo details:', err);
        res.status(500).json(err);
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});