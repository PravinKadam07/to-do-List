import React, { useState } from 'react';

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(task._id, newTitle);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewTitle(task.title);
  };

  return (
    <li className="task-item">
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        {isEditing ? (
          <>
            <input 
              type="text" 
              value={newTitle} 
              onChange={(e) => setNewTitle(e.target.value)} 
            />
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
