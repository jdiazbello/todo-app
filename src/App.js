import React, { useState, useEffect } from 'react';
import { urlTask } from './endpoints';
import { TypeList } from './components/TypeList';
import { TaskTable } from './components/TaskTable';
import { Header } from './components/Header'

import { AddTask } from './components/AddTask';

function App() {

  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => getTask(), []);

  const getTask = () => {
    try {
      fetch(urlTask)
        .then(
          response => response.json())
        .then(
          data => {
            setTaskItems(data);
          })
        .catch(err => console.log(err));
    }
    catch (err) {
      console.log(err);
    }
  }

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      var data = { name: taskName };
      fetch(urlTask, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          getTask();
        });
    }
  };

  const tableCallback = task => {
    var data = {
      completed: !task.completed,
    };


    var URL = `${urlTask}?id=${task.id}`;

    fetch(URL, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        getTask();
      }
      )
  }


  return (
    <div className="App">
      <Header taskItems={taskItems} />
      <div className="container-fluid">
        <AddTask callback={createNewTask} />
        <div className="container">
          <div className="row">
            {
              TypeList.map(type => (
                <TaskTable
                  key={type.title}
                  Title={type.title}
                  completed={type.completed}
                  items={taskItems.filter(task => task.completed === type.completed)}
                  callback={tableCallback}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
