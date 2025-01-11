const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newTask = await Task.create({ title, description });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", error });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true }
        );

        if (!updatedTask) return res.status(404).json({ message: "Task not found" });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task", error });
    }
};


exports.toggleTaskCompletion = async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      task.completed = !task.completed;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  };
  