import React, { useState,useEffect } from 'react';
import {TypeList} from './components/TypeList';
import {TaskTable} from './components/TaskTable';
import { Header } from './components/Header'

import { AddTask } from './components/AddTask';

function App() {
  
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => getTask(), []);

  const getTask =() =>{
    try{
      fetch("http://localhost:50454/api/task")
      .then(
        response => response.json())
      .then(
        data => {
          setTaskItems(data);
          console.log(data);
        })
      .catch(err => console.log(err));
    }
    catch (err)
    {
      console.log(err);
    }
  }

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      var data = { name: taskName };
      fetch('http://localhost:50454/api/task', {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success:', response)
          getTask();
        });
    }
  };


  return (
    <div className="App">
            <Header taskItems={taskItems} />
            <div className="container-fluid">
            <AddTask callback={createNewTask} />
            <div className="container">
          <div className="row">
          {
              TypeList.map(type =>(
                <TaskTable key={type.title} Title={type.title} completed={type.completed} items={taskItems.filter(task =>task.completed === type.completed)}/>
              ))
            }
          </div>
        </div>
    </div>
    </div>

  );
}

export default App;
