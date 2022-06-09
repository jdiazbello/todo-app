import React, { useState,useEffect } from 'react';
import { TaskRow } from "./components/TaskRow";
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


  const taskTableRows = (isDone) =>
  taskItems
    .filter(task => task.completed === isDone)
    .map(task => (
      <TaskRow key={task.id} task={task} />
    ));

  return (
    <div className="App">
            <Header taskItems={taskItems} />
            <div className="container-fluid">
            <AddTask callback={createNewTask} />
            <div className="container">
          <div className="row">
            <div className="col">
              <div className="card text-center">
                <div className="card-header bg-warning">
                  TODO
                </div>
                <div className="card-body">
                  <table className="table table-striped table-bordered ">
                    <thead>
                      <tr>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>{taskTableRows(false)}</tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col">
            <div className="card text-center">
                <div className="card-header bg-success">
                  DONE
                </div>
                <div className="card-body">
                  <table className="table table-striped table-bordered ">
                    <thead>
                      <tr>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>{taskTableRows(true)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>

  );
}

export default App;
