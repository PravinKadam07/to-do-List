import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import axios from '../api'; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Add task
  const addTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', { title: task });
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`);
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: response.data.completed } : task
        )
      );
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Edit task
  const editTask = async (id, newTitle) => {
    try {
      const response = await axios.patch(`/api/tasks/${id}`, { title: newTitle });
      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, title: response.data.title } : task
        )
      );
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={() => toggleTask(task._id)}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
