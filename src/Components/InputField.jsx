import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputField = ({ taskList, setTaskList }) => {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const addSubtask = () => {
    if (subtaskInput.trim()) {
      setSubtasks([...subtasks, subtaskInput.trim()]);
      setSubtaskInput("");
    }
  };

  const handleTask = (e) => {
    e.preventDefault();
    if (!input || !dueDate) return;
    setTaskList([...taskList, { text: input, priority, dueDate, subtasks, completed: false }]);
    setInput("");
    setPriority("Low");
    setDueDate("");
    setSubtasks([]);
  };

  return (
    <motion.form
      className='flex flex-col sm:flex-row items-center gap-3'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        className='border border-gray-300 rounded-lg px-2.5 py-1.5 text-lg bg-gray-100'
        type="text"
        placeholder='Add a Task'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border border-gray-300 rounded-lg px-2 py-1 bg-gray-100"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border border-gray-300 rounded-lg px-2 py-1 bg-gray-100"
      />
      <div className='flex flex-col gap-2'>
        <input
          type="text"
          placeholder="Add a subtask"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 bg-gray-100"
        />
        <button
          type="button"
          className='bg-green-500 px-2 py-1 rounded-lg text-white font-semibold hover:opacity-70'
          onClick={addSubtask}
        >
          Add Subtask
        </button>
        <ul className='list-disc pl-5'>
          {subtasks.map((subtask, index) => (
            <li key={index} className='text-sm text-gray-700'>{subtask}</li>
          ))}
        </ul>
      </div>
      <button
        className='bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:opacity-70'
        onClick={handleTask}
      >
        Add
      </button>
    </motion.form>
  );
};

export default InputField;