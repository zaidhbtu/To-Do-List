import React from 'react';
import { motion } from 'framer-motion';

const Board = ({ task, index, taskList, setTaskList }) => {
  const handleDelete = () => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const toggleCompletion = () => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskList(updatedTasks);
  };

  return (
    <motion.div
      className='p-4 border border-violet-400 rounded-lg bg-blue-100'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.text}</p>
      <p className='text-sm text-gray-600'>Priority: {task.priority}</p>
      <p className='text-sm text-gray-600'>Due Date: {task.dueDate}</p>
      {task.subtasks && task.subtasks.length > 0 && (
        <div className='mt-2'>
          <h4 className='text-sm font-semibold'>Subtasks:</h4>
          <ul className='list-disc pl-5'>
            {task.subtasks.map((subtask, index) => (
              <li key={index} className='text-sm text-gray-700'>{subtask}</li>
            ))}
          </ul>
        </div>
      )}
      <div className='flex gap-2 mt-2'>
        <button
          className='bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600'
          onClick={toggleCompletion}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          className='bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600'
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default Board;
