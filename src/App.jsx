import React, { useState, useEffect } from 'react';
import InputField from './Components/InputField';
import Board from './Components/Board';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [reminders, setReminders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const upcomingTasks = taskList.filter(task => new Date(task.dueDate) <= now);
      setReminders(upcomingTasks);
    };
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [taskList]);

  const filteredTasks = taskList.filter(task =>
    task.text.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const completedTasksCount = taskList.filter(task => task.completed).length;
  const totalTasksCount = taskList.length;
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <div className={`px-4 sm:px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className='flex flex-col items-center justify-center py-8 gap-4'>
        <h1 className='text-2xl font-semibold'>To Do Board</h1>
        <button
          className='px-4 py-2 rounded-lg font-semibold bg-indigo-500 text-white hover:opacity-70'
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <InputField taskList={taskList} setTaskList={setTaskList} />
        <input
          type="text"
          placeholder="Search tasks..."
          className="border border-gray-300 rounded-lg px-2 py-1 w-full max-w-md"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
        <div className='w-full max-w-md mt-4'>
          <h2 className='text-lg font-semibold'>Progress</h2>
          <div className='w-full bg-gray-300 rounded-full h-4'>
            <div
              className='bg-green-500 h-4 rounded-full'
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className='text-sm mt-2'>{completedTasksCount} of {totalTasksCount} tasks completed</p>
        </div>
        {reminders.length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
            <h2 className="text-lg font-bold">Upcoming Deadlines</h2>
            <ul>
              {reminders.map((task, index) => (
                <li key={index} className="text-sm text-red-700">{task.text} - Due: {task.dueDate}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-4'>
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Board
                index={index}
                task={task}
                taskList={taskList}
                setTaskList={setTaskList}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
