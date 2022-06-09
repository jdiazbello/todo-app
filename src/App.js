import React, { useState,useEffect } from 'react';
import { TaskRow } from "./components/TaskRow";

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

  const taskTableRows = (isDone) =>
  taskItems
    .filter(task => task.completed === isDone)
    .map(task => (
      <TaskRow key={task.id} task={task} />
    ));

  return (
    <div className="App">
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
  );
}

export default App;
