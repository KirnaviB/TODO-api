const Todo = require("../models/todoModel");

let todos = [];
let nextId = 1;

function validateTodo(data) {
    const { task, completed, priority, dueDate } = data;

    // Required field checks
    if (task === undefined) return "Task is required";
    if (completed === undefined) return "Completed is required";
    if (priority === undefined) return "Priority is required";
    if (dueDate === undefined) return "Due date is required";

    // Task validation
    if (typeof task !== "string") return "Task must be a string";
    if (task.trim() === "") return "Task cannot be empty";

    // Completed validation
    if (typeof completed !== "boolean") {
        return "Completed must be either true or false (without quotes)";
    }

    // Priority validation
    if (!["high", "medium", "low"].includes(priority)) {
        return "Priority must be one of: high, medium, low";
    }

    // Date format validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (typeof dueDate !== "string") {
        return "Due date must be a string in format YYYY-MM-DD";
    }

    if (!dateRegex.test(dueDate)) {
        return "Due date must be in format YYYY-MM-DD";
    }

    // Check if it's a real date
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
        return "Due date must be a valid calendar date";
    }

    return null; 
}

// Create
function createTodo(data) {
    const error = validateTodo(data);
    if (error) return { error };

    const newTodo = new Todo(
        nextId++,
        data.task,
        data.completed,
        data.priority,
        data.dueDate
    );

    todos.push(newTodo);
    return { todo: newTodo };
}

// Get all (with filters)
function getTodos(query) {
    let result = [...todos];

    if (query.completed !== undefined) {
        const completedBool = query.completed === "true";
        result = result.filter(t => t.completed === completedBool);
    }

    if (query.priority) {
        result = result.filter(t => t.priority === query.priority);
    }

    return result;
}

// Get by ID
function getTodoById(id) {
    return todos.find(t => t.id === id);
}

// Update
function updateTodo(id, data) {
    const todo = getTodoById(id);
    if (!todo) return null;

    const error = validateTodo(data);
    if (error) return { error };

    todo.task = data.task;
    todo.completed = data.completed;
    todo.priority = data.priority;
    todo.dueDate = data.dueDate;

    return { todo };
}

// Delete
function deleteTodo(id) {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
}

// Toggle completion
function toggleComplete(id) {
    const todo = getTodoById(id);
    if (!todo) return null;

    todo.completed = !todo.completed;
    return todo;
}

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    toggleComplete
};
