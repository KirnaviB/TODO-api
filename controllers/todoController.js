const todoService = require("../services/todoService");

// Create
exports.createTodo = (req, res) => {
    const result = todoService.createTodo(req.body);

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    res.status(201).json(result.todo);
};

// Get all
exports.getTodos = (req, res) => {
    const todos = todoService.getTodos(req.query);
    res.json(todos);
};

// Get by ID
exports.getTodoById = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todoService.getTodoById(id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
};

// Update
exports.updateTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const result = todoService.updateTodo(id, req.body);

    if (result === null) {
        return res.status(404).json({ error: "Todo not found" });
    }

    if (result.error) {
        return res.status(400).json({ error: result.error });
    }

    res.json(result.todo);
};

// Delete
exports.deleteTodo = (req, res) => {
    const id = parseInt(req.params.id);
    const success = todoService.deleteTodo(id);

    if (!success) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
};

// Toggle
exports.toggleComplete = (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todoService.toggleComplete(id);

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
};
